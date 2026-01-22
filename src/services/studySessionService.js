import { supabase } from '../lib/supabaseClient.js';

/**
 * Start a new study session for a user
 * @param {string} userId - The user's ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function startStudySession(userId) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const { data: activeSession } = await getActiveSession(userId);

    if (activeSession) {
      return { data: activeSession, error: null };
    }

    const sessionData = {
      user_id: userId,
      start_time: new Date().toISOString(),
      end_time: null,
      duration_minutes: 0,
      activities_completed: 0,
      xp_earned: 0,
      lessons_completed: 0,
      words_reviewed: 0,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('study_sessions')
      .insert(sessionData)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error starting study session:', error);
    return { data: null, error };
  }
}

/**
 * End an active study session
 * @param {string} sessionId - The session's ID
 * @param {Object} [sessionStats={}] - Session statistics
 * @param {number} [sessionStats.activities_completed] - Number of activities completed
 * @param {number} [sessionStats.xp_earned] - Total XP earned in session
 * @param {number} [sessionStats.lessons_completed] - Number of lessons completed
 * @param {number} [sessionStats.words_reviewed] - Number of words reviewed
 * @param {Object} [sessionStats.metadata] - Additional session metadata
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function endStudySession(sessionId, sessionStats = {}) {
  try {
    if (!sessionId) {
      return { data: null, error: new Error('Session ID is required') };
    }

    const { data: session, error: fetchError } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return { data: null, error: new Error('Session not found') };
      }
      throw fetchError;
    }

    if (!session.is_active) {
      return { data: session, error: null };
    }

    const endTime = new Date();
    const startTime = new Date(session.start_time);
    const durationMinutes = Math.round((endTime - startTime) / (1000 * 60));

    const updateData = {
      end_time: endTime.toISOString(),
      duration_minutes: durationMinutes,
      activities_completed: sessionStats.activities_completed ?? session.activities_completed ?? 0,
      xp_earned: sessionStats.xp_earned ?? session.xp_earned ?? 0,
      lessons_completed: sessionStats.lessons_completed ?? session.lessons_completed ?? 0,
      words_reviewed: sessionStats.words_reviewed ?? session.words_reviewed ?? 0,
      metadata: sessionStats.metadata ?? session.metadata ?? {},
      is_active: false,
      updated_at: endTime.toISOString(),
    };

    const { data, error } = await supabase
      .from('study_sessions')
      .update(updateData)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error ending study session:', error);
    return { data: null, error };
  }
}

/**
 * Get the active study session for a user
 * @param {string} userId - The user's ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getActiveSession(userId) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const { data, error } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('start_time', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return { data: null, error: null };
      }
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching active session:', error);
    return { data: null, error };
  }
}

/**
 * Update study session progress
 * @param {string} sessionId - The session's ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateSessionProgress(sessionId, updates) {
  try {
    if (!sessionId) {
      return { data: null, error: new Error('Session ID is required') };
    }

    if (!updates || Object.keys(updates).length === 0) {
      return { data: null, error: new Error('No updates provided') };
    }

    const updateData = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('study_sessions')
      .update(updateData)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return { data: null, error: new Error('Session not found') };
      }
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error updating session progress:', error);
    return { data: null, error };
  }
}

/**
 * Get user's study session history
 * @param {string} userId - The user's ID
 * @param {number} [limit=20] - Maximum number of sessions to return
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function getSessionHistory(userId, limit = 20) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    if (typeof limit !== 'number' || limit < 1 || limit > 100) {
      limit = 20;
    }

    const { data, error } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching session history:', error);
    return { data: null, error };
  }
}

/**
 * Get study session statistics
 * @param {string} userId - The user's ID
 * @param {number} [days=30] - Number of days to analyze
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getSessionStats(userId, days = 30) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const { data: sessions, error } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', userId)
      .gte('start_time', cutoffDate.toISOString())
      .eq('is_active', false);

    if (error) throw error;

    if (!sessions || sessions.length === 0) {
      return {
        data: {
          total_sessions: 0,
          total_study_time: 0,
          average_session_duration: 0,
          total_activities: 0,
          total_xp: 0,
          total_lessons: 0,
          total_words: 0,
          longest_session: 0,
          sessions_per_week: 0,
        },
        error: null,
      };
    }

    const totalSessions = sessions.length;
    const totalStudyTime = sessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
    const averageSessionDuration = Math.round(totalStudyTime / totalSessions);
    const totalActivities = sessions.reduce((sum, s) => sum + (s.activities_completed || 0), 0);
    const totalXp = sessions.reduce((sum, s) => sum + (s.xp_earned || 0), 0);
    const totalLessons = sessions.reduce((sum, s) => sum + (s.lessons_completed || 0), 0);
    const totalWords = sessions.reduce((sum, s) => sum + (s.words_reviewed || 0), 0);
    const longestSession = Math.max(...sessions.map(s => s.duration_minutes || 0));
    const sessionsPerWeek = Math.round((totalSessions / days) * 7);

    const stats = {
      total_sessions: totalSessions,
      total_study_time: totalStudyTime,
      average_session_duration: averageSessionDuration,
      total_activities: totalActivities,
      total_xp: totalXp,
      total_lessons: totalLessons,
      total_words: totalWords,
      longest_session: longestSession,
      sessions_per_week: sessionsPerWeek,
    };

    return { data: stats, error: null };
  } catch (error) {
    console.error('Error fetching session stats:', error);
    return { data: null, error };
  }
}

/**
 * Auto-end stale sessions (sessions that have been active for too long)
 * @param {string} userId - The user's ID
 * @param {number} [maxHours=24] - Maximum hours before a session is considered stale
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function autoEndStaleSessions(userId, maxHours = 24) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - maxHours);

    const { data: staleSessions, error: fetchError } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .lt('start_time', cutoffTime.toISOString());

    if (fetchError) throw fetchError;

    const endedSessions = [];

    for (const session of staleSessions || []) {
      const { data: endedSession } = await endStudySession(session.id);
      if (endedSession) {
        endedSessions.push(endedSession);
      }
    }

    return { data: endedSessions, error: null };
  } catch (error) {
    console.error('Error auto-ending stale sessions:', error);
    return { data: null, error };
  }
}
