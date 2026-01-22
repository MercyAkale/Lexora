import { supabase } from '../lib/supabaseClient.js';

/**
 * Get vocabulary words by language and category
 * @param {string} languageCode - Language code (e.g., 'es', 'fr')
 * @param {string} [category] - Optional category filter
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function getVocabularyWords(languageCode, category = null) {
  try {
    if (!languageCode) {
      return { data: null, error: new Error('Language code is required') };
    }

    let query = supabase
      .from('vocabulary_words')
      .select('*')
      .eq('language_code', languageCode)
      .order('difficulty_level', { ascending: true })
      .order('word', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching vocabulary words:', error);
    return { data: null, error };
  }
}

/**
 * Get user's vocabulary progress for a specific language
 * @param {string} userId - The user's ID
 * @param {string} languageCode - Language code
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function getUserVocabularyProgress(userId, languageCode) {
  try {
    if (!userId || !languageCode) {
      return { data: null, error: new Error('User ID and language code are required') };
    }

    const { data, error } = await supabase
      .from('user_vocabulary_progress')
      .select(`
        *,
        vocabulary (
          word,
          translation,
          language_code,
          category,
          difficulty_level
        )
      `)
      .eq('user_id', userId)
      .eq('vocabulary.language_code', languageCode)
      .order('last_reviewed', { ascending: false });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching user vocabulary progress:', error);
    return { data: null, error };
  }
}

/**
 * Get words that are due for review based on SRS algorithm
 * @param {string} userId - The user's ID
 * @param {number} [limit=20] - Maximum number of words to return
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function getWordsForReview(userId, limit = 20) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('user_vocabulary_progress')
      .select(`
        *,
        vocabulary (
          word,
          translation,
          pronunciation,
          example_sentence,
          example_translation,
          language_code,
          category,
          difficulty_level,
          audio_url
        )
      `)
      .eq('user_id', userId)
      .lte('next_review_date', now)
      .order('next_review_date', { ascending: true })
      .limit(limit);

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching words for review:', error);
    return { data: null, error };
  }
}

/**
 * Update word progress after a review
 * @param {string} userId - The user's ID
 * @param {string} wordId - The vocabulary word's ID
 * @param {boolean} isCorrect - Whether the user answered correctly
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateWordProgress(userId, wordId, isCorrect) {
  try {
    if (!userId || !wordId) {
      return { data: null, error: new Error('User ID and word ID are required') };
    }

    const { data: existingProgress, error: fetchError } = await supabase
      .from('user_vocabulary_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('word_id', wordId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    const now = new Date();
    let masteryLevel = existingProgress?.mastery_level || 0;
    let correctCount = existingProgress?.correct_count || 0;
    let incorrectCount = existingProgress?.incorrect_count || 0;
    let reviewCount = existingProgress?.review_count || 0;

    reviewCount += 1;

    if (isCorrect) {
      correctCount += 1;
      masteryLevel = Math.min(masteryLevel + 1, 8);
    } else {
      incorrectCount += 1;
      masteryLevel = Math.max(masteryLevel - 2, 0);
    }

    const nextReviewDate = calculateNextReviewDate(masteryLevel);

    const progressData = {
      user_id: userId,
      word_id: wordId,
      mastery_level: masteryLevel,
      correct_count: correctCount,
      incorrect_count: incorrectCount,
      review_count: reviewCount,
      last_reviewed: now.toISOString(),
      next_review_date: nextReviewDate.toISOString(),
      updated_at: now.toISOString(),
    };

    if (existingProgress) {
      const { data, error } = await supabase
        .from('user_vocabulary_progress')
        .update(progressData)
        .eq('user_id', userId)
        .eq('word_id', wordId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } else {
      progressData.created_at = now.toISOString();

      const { data, error } = await supabase
        .from('user_vocabulary_progress')
        .insert(progressData)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    }
  } catch (error) {
    console.error('Error updating word progress:', error);
    return { data: null, error };
  }
}

/**
 * Calculate next review date using Spaced Repetition System (SRS) algorithm
 * Based on SuperMemo SM-2 algorithm with intervals in minutes/hours/days
 * @param {number} masteryLevel - Current mastery level (0-8)
 * @returns {Date} Next review date
 */
export function calculateNextReviewDate(masteryLevel) {
  const now = new Date();
  
  const intervals = [
    1,       // Level 0: 1 minute
    5,       // Level 1: 5 minutes
    30,      // Level 2: 30 minutes
    180,     // Level 3: 3 hours
    720,     // Level 4: 12 hours
    1440,    // Level 5: 1 day
    4320,    // Level 6: 3 days
    10080,   // Level 7: 1 week
    43200,   // Level 8: 1 month
  ];

  const intervalMinutes = intervals[Math.min(masteryLevel, intervals.length - 1)];
  const nextReview = new Date(now.getTime() + intervalMinutes * 60 * 1000);

  return nextReview;
}

/**
 * Add a new word to user's vocabulary learning list
 * @param {string} userId - The user's ID
 * @param {string} wordId - The vocabulary word's ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function addWordToLearning(userId, wordId) {
  try {
    if (!userId || !wordId) {
      return { data: null, error: new Error('User ID and word ID are required') };
    }

    const { data: existingProgress } = await supabase
      .from('user_vocabulary_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('word_id', wordId)
      .single();

    if (existingProgress) {
      return { data: existingProgress, error: null };
    }

    const now = new Date();
    const nextReview = calculateNextReviewDate(0);

    const progressData = {
      user_id: userId,
      word_id: wordId,
      mastery_level: 0,
      correct_count: 0,
      incorrect_count: 0,
      review_count: 0,
      last_reviewed: null,
      next_review_date: nextReview.toISOString(),
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };

    const { data, error } = await supabase
      .from('user_vocabulary_progress')
      .insert(progressData)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error adding word to learning:', error);
    return { data: null, error };
  }
}

/**
 * Get vocabulary statistics for a user
 * @param {string} userId - The user's ID
 * @param {string} [languageCode] - Optional language filter
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getVocabularyStats(userId, languageCode = null) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    let query = supabase
      .from('user_vocabulary_progress')
      .select(`
        *,
        vocabulary (
          language_code,
          difficulty_level
        )
      `)
      .eq('user_id', userId);

    if (languageCode) {
      query = query.eq('vocabulary.language_code', languageCode);
    }

    const { data: progressData, error } = await query;

    if (error) throw error;

    const stats = {
      total_words: progressData.length,
      mastered_words: progressData.filter(p => p.mastery_level >= 6).length,
      learning_words: progressData.filter(p => p.mastery_level > 0 && p.mastery_level < 6).length,
      new_words: progressData.filter(p => p.mastery_level === 0).length,
      total_reviews: progressData.reduce((sum, p) => sum + (p.review_count || 0), 0),
      accuracy: progressData.length > 0
        ? Math.round(
            (progressData.reduce((sum, p) => sum + (p.correct_count || 0), 0) /
              progressData.reduce((sum, p) => sum + (p.review_count || 0), 1)) * 100
          )
        : 0,
    };

    return { data: stats, error: null };
  } catch (error) {
    console.error('Error fetching vocabulary stats:', error);
    return { data: null, error };
  }
}
