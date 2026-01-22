import { supabase } from '../lib/supabaseClient.js';

/**
 * Log a user activity
 * @param {string} userId - The user's ID
 * @param {string} activityType - Type of activity (lesson_completed, word_learned, achievement_earned, etc.)
 * @param {Object} [activityData={}] - Additional activity data
 * @param {string} [activityData.lesson_key] - Lesson key if applicable
 * @param {string} [activityData.word_id] - Word ID if applicable
 * @param {string} [activityData.achievement_key] - Achievement key if applicable
 * @param {number} [activityData.xp_earned] - XP earned from activity
 * @param {number} [activityData.score] - Score achieved
 * @param {Object} [activityData.metadata] - Any additional metadata
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function logActivity(userId, activityType, activityData = {}) {
  try {
    if (!userId || !activityType) {
      return { data: null, error: new Error('User ID and activity type are required') };
    }

    const validActivityTypes = [
      'lesson_started',
      'lesson_completed',
      'word_learned',
      'word_reviewed',
      'achievement_earned',
      'streak_milestone',
      'study_session_completed',
      'quiz_completed',
      'daily_goal_reached',
    ];

    if (!validActivityTypes.includes(activityType)) {
      return { data: null, error: new Error(`Invalid activity type: ${activityType}`) };
    }

    const activity = {
      user_id: userId,
      activity_type: activityType,
      lesson_key: activityData.lesson_key || null,
      word_id: activityData.word_id || null,
      achievement_key: activityData.achievement_key || null,
      xp_earned: activityData.xp_earned || 0,
      score: activityData.score || null,
      metadata: activityData.metadata || {},
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('user_activities')
      .insert(activity)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error logging activity:', error);
    return { data: null, error };
  }
}

/**
 * Get user's recent activities
 * @param {string} userId - The user's ID
 * @param {number} [limit=50] - Maximum number of activities to return
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function getUserActivities(userId, limit = 50) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    if (typeof limit !== 'number' || limit < 1 || limit > 100) {
      limit = 50;
    }

    const { data, error } = await supabase
      .from('user_activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching user activities:', error);
    return { data: null, error };
  }
}

/**
 * Get user's activities from the last N days
 * @param {string} userId - The user's ID
 * @param {number} [days=7] - Number of days to look back
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function getRecentActivities(userId, days = 7) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    if (typeof days !== 'number' || days < 1 || days > 365) {
      days = 7;
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const { data, error } = await supabase
      .from('user_activities')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', cutoffDate.toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    return { data: null, error };
  }
}

/**
 * Get activity statistics for a user
 * @param {string} userId - The user's ID
 * @param {number} [days=30] - Number of days to analyze
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getActivityStats(userId, days = 30) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const { data: activities, error } = await getRecentActivities(userId, days);

    if (error) {
      return { data: null, error };
    }

    const stats = {
      total_activities: activities.length,
      lessons_completed: activities.filter(a => a.activity_type === 'lesson_completed').length,
      words_learned: activities.filter(a => a.activity_type === 'word_learned').length,
      words_reviewed: activities.filter(a => a.activity_type === 'word_reviewed').length,
      achievements_earned: activities.filter(a => a.activity_type === 'achievement_earned').length,
      total_xp_earned: activities.reduce((sum, a) => sum + (a.xp_earned || 0), 0),
      average_score: calculateAverageScore(activities),
      daily_breakdown: getDailyBreakdown(activities, days),
      most_active_day: getMostActiveDay(activities),
    };

    return { data: stats, error: null };
  } catch (error) {
    console.error('Error fetching activity stats:', error);
    return { data: null, error };
  }
}

/**
 * Calculate average score from activities
 * @param {Array} activities - Array of activities
 * @returns {number} Average score
 */
function calculateAverageScore(activities) {
  const activitiesWithScore = activities.filter(a => a.score !== null && a.score !== undefined);
  
  if (activitiesWithScore.length === 0) {
    return 0;
  }

  const totalScore = activitiesWithScore.reduce((sum, a) => sum + a.score, 0);
  return Math.round(totalScore / activitiesWithScore.length);
}

/**
 * Get daily breakdown of activities
 * @param {Array} activities - Array of activities
 * @param {number} days - Number of days
 * @returns {Array} Daily breakdown
 */
function getDailyBreakdown(activities, days) {
  const breakdown = {};

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    breakdown[dateKey] = {
      date: dateKey,
      count: 0,
      xp_earned: 0,
      activities: [],
    };
  }

  activities.forEach(activity => {
    const dateKey = activity.created_at.split('T')[0];
    if (breakdown[dateKey]) {
      breakdown[dateKey].count += 1;
      breakdown[dateKey].xp_earned += activity.xp_earned || 0;
      breakdown[dateKey].activities.push(activity.activity_type);
    }
  });

  return Object.values(breakdown).sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Get the most active day of the week
 * @param {Array} activities - Array of activities
 * @returns {string} Most active day name
 */
function getMostActiveDay(activities) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayCounts = [0, 0, 0, 0, 0, 0, 0];

  activities.forEach(activity => {
    const date = new Date(activity.created_at);
    const dayIndex = date.getDay();
    dayCounts[dayIndex] += 1;
  });

  const maxCount = Math.max(...dayCounts);
  if (maxCount === 0) {
    return 'N/A';
  }

  const mostActiveDayIndex = dayCounts.indexOf(maxCount);
  return dayNames[mostActiveDayIndex];
}

/**
 * Get activities by type
 * @param {string} userId - The user's ID
 * @param {string} activityType - Type of activity to filter
 * @param {number} [limit=50] - Maximum number of activities to return
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function getActivitiesByType(userId, activityType, limit = 50) {
  try {
    if (!userId || !activityType) {
      return { data: null, error: new Error('User ID and activity type are required') };
    }

    const { data, error } = await supabase
      .from('user_activities')
      .select('*')
      .eq('user_id', userId)
      .eq('activity_type', activityType)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching activities by type:', error);
    return { data: null, error };
  }
}

/**
 * Delete old activities (for cleanup purposes)
 * @param {string} userId - The user's ID
 * @param {number} [daysToKeep=90] - Number of days of activities to keep
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function cleanupOldActivities(userId, daysToKeep = 90) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const { data, error } = await supabase
      .from('user_activities')
      .delete()
      .eq('user_id', userId)
      .lt('created_at', cutoffDate.toISOString())
      .select();

    if (error) throw error;

    return {
      data: {
        deleted_count: data?.length || 0,
        cutoff_date: cutoffDate.toISOString(),
      },
      error: null,
    };
  } catch (error) {
    console.error('Error cleaning up old activities:', error);
    return { data: null, error };
  }
}
