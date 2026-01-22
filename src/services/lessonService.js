import { supabase } from '../lib/supabaseClient.js';

/**
 * Get lessons with optional filters
 * @param {Object} [filters={}] - Filter options
 * @param {string} [filters.language] - Filter by language code
 * @param {string} [filters.category] - Filter by category
 * @param {string} [filters.difficulty] - Filter by difficulty level
 * @param {number} [filters.limit] - Limit number of results
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function getLessons(filters = {}) {
  try {
    let query = supabase
      .from('lessons')
      .select('*')
      .order('order_index', { ascending: true });

    if (filters.language) {
      query = query.eq('language_code', filters.language);
    }

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.difficulty) {
      query = query.eq('difficulty_level', filters.difficulty);
    }

    if (filters.limit && typeof filters.limit === 'number') {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return { data: null, error };
  }
}

/**
 * Get lesson progress for a specific user and lesson
 * @param {string} userId - The user's ID
 * @param {string} lessonKey - The lesson's unique key
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getLessonProgress(userId, lessonKey) {
  try {
    if (!userId || !lessonKey) {
      return { data: null, error: new Error('User ID and lesson key are required') };
    }

    const { data, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_key', lessonKey)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return { data: null, error: null };
      }
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching lesson progress:', error);
    return { data: null, error };
  }
}

/**
 * Update lesson progress for a user
 * @param {string} userId - The user's ID
 * @param {string} lessonKey - The lesson's unique key
 * @param {Object} progressData - Progress data to update
 * @param {number} [progressData.progress_percentage] - Progress percentage (0-100)
 * @param {number} [progressData.score] - Score achieved
 * @param {number} [progressData.time_spent] - Time spent in minutes
 * @param {Object} [progressData.completed_exercises] - Completed exercises data
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateLessonProgress(userId, lessonKey, progressData) {
  try {
    if (!userId || !lessonKey) {
      return { data: null, error: new Error('User ID and lesson key are required') };
    }

    const { data: existingProgress } = await getLessonProgress(userId, lessonKey);

    const updateData = {
      user_id: userId,
      lesson_key: lessonKey,
      progress_percentage: progressData.progress_percentage ?? existingProgress?.progress_percentage ?? 0,
      score: progressData.score ?? existingProgress?.score ?? 0,
      time_spent: progressData.time_spent ?? existingProgress?.time_spent ?? 0,
      completed_exercises: progressData.completed_exercises ?? existingProgress?.completed_exercises ?? {},
      is_completed: progressData.is_completed ?? existingProgress?.is_completed ?? false,
      last_accessed: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (existingProgress) {
      const { data, error } = await supabase
        .from('lesson_progress')
        .update(updateData)
        .eq('user_id', userId)
        .eq('lesson_key', lessonKey)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } else {
      updateData.created_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('lesson_progress')
        .insert(updateData)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    }
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    return { data: null, error };
  }
}

/**
 * Mark a lesson as completed
 * @param {string} userId - The user's ID
 * @param {string} lessonKey - The lesson's unique key
 * @param {number} score - Final score achieved
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function completeLesson(userId, lessonKey, score) {
  try {
    if (!userId || !lessonKey) {
      return { data: null, error: new Error('User ID and lesson key are required') };
    }

    if (typeof score !== 'number' || score < 0 || score > 100) {
      return { data: null, error: new Error('Invalid score value (must be 0-100)') };
    }

    const { data: existingProgress } = await getLessonProgress(userId, lessonKey);

    const progressData = {
      user_id: userId,
      lesson_key: lessonKey,
      progress_percentage: 100,
      score: score,
      is_completed: true,
      completed_at: new Date().toISOString(),
      last_accessed: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (existingProgress) {
      progressData.time_spent = existingProgress.time_spent || 0;
      progressData.completed_exercises = existingProgress.completed_exercises || {};
      progressData.attempts = (existingProgress.attempts || 0) + 1;
      progressData.best_score = Math.max(score, existingProgress.best_score || 0);

      const { data, error } = await supabase
        .from('lesson_progress')
        .update(progressData)
        .eq('user_id', userId)
        .eq('lesson_key', lessonKey)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } else {
      progressData.created_at = new Date().toISOString();
      progressData.attempts = 1;
      progressData.best_score = score;

      const { data, error } = await supabase
        .from('lesson_progress')
        .insert(progressData)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    }
  } catch (error) {
    console.error('Error completing lesson:', error);
    return { data: null, error };
  }
}

/**
 * Get user's lesson statistics
 * @param {string} userId - The user's ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getUserLessonStats(userId) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const { data: progressData, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    const stats = {
      total_lessons_started: progressData.length,
      total_lessons_completed: progressData.filter(p => p.is_completed).length,
      total_time_spent: progressData.reduce((sum, p) => sum + (p.time_spent || 0), 0),
      average_score: progressData.length > 0
        ? Math.round(progressData.reduce((sum, p) => sum + (p.score || 0), 0) / progressData.length)
        : 0,
      completion_rate: progressData.length > 0
        ? Math.round((progressData.filter(p => p.is_completed).length / progressData.length) * 100)
        : 0,
      lessons_in_progress: progressData.filter(p => !p.is_completed && p.progress_percentage > 0).length,
    };

    return { data: stats, error: null };
  } catch (error) {
    console.error('Error fetching user lesson stats:', error);
    return { data: null, error };
  }
}
