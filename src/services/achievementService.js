import { supabase } from '../lib/supabaseClient.js';

/**
 * Get all available achievements
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function getAchievements() {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('category', { ascending: true })
      .order('required_value', { ascending: true });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return { data: null, error };
  }
}

/**
 * Get user's earned achievements
 * @param {string} userId - The user's ID
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function getUserAchievements(userId) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const { data, error } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievements (
          achievement_key,
          title,
          description,
          category,
          icon,
          required_value,
          xp_reward
        )
      `)
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    return { data: null, error };
  }
}

/**
 * Award an achievement to a user
 * @param {string} userId - The user's ID
 * @param {string} achievementKey - The achievement's unique key
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
async function awardAchievement(userId, achievementKey) {
  try {
    const { data: existingAward } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .eq('achievement_key', achievementKey)
      .single();

    if (existingAward) {
      return { data: existingAward, error: null };
    }

    const { data: achievement } = await supabase
      .from('achievements')
      .select('*')
      .eq('achievement_key', achievementKey)
      .single();

    if (!achievement) {
      return { data: null, error: new Error('Achievement not found') };
    }

    const awardData = {
      user_id: userId,
      achievement_key: achievementKey,
      earned_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('user_achievements')
      .insert(awardData)
      .select()
      .single();

    if (error) throw error;

    if (achievement.xp_reward > 0) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_xp')
        .eq('user_id', userId)
        .single();

      if (profile) {
        await supabase
          .from('profiles')
          .update({
            total_xp: (profile.total_xp || 0) + achievement.xp_reward,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);
      }
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error awarding achievement:', error);
    return { data: null, error };
  }
}

/**
 * Check user's progress and award applicable achievements
 * @param {string} userId - The user's ID
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function checkAndAwardAchievements(userId) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const newAchievements = [];

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!profile) {
      return { data: [], error: null };
    }

    const { data: lessonProgress } = await supabase
      .from('user_lesson_progress')
      .select('*')
      .eq('user_id', userId);

    const { data: vocabularyProgress } = await supabase
      .from('user_vocabulary_progress')
      .select('*')
      .eq('user_id', userId);

    const { data: achievements } = await getAchievements();
    const { data: userAchievements } = await getUserAchievements(userId);

    const earnedKeys = new Set(userAchievements.map(ua => ua.achievement_key));

    for (const achievement of achievements) {
      if (earnedKeys.has(achievement.achievement_key)) {
        continue;
      }

      let shouldAward = false;

      switch (achievement.category) {
        case 'streak':
          if (profile.current_streak >= achievement.required_value) {
            shouldAward = true;
          }
          break;

        case 'lessons': {
          const completedLessons = lessonProgress?.filter(lp => lp.is_completed).length || 0;
          if (completedLessons >= achievement.required_value) {
            shouldAward = true;
          }
          break;
        }

        case 'vocabulary': {
          const masteredWords = vocabularyProgress?.filter(vp => vp.mastery_level >= 6).length || 0;
          if (masteredWords >= achievement.required_value) {
            shouldAward = true;
          }
          break;
        }

        case 'xp':
          if (profile.total_xp >= achievement.required_value) {
            shouldAward = true;
          }
          break;

        case 'study_time':
          if (profile.total_study_time >= achievement.required_value) {
            shouldAward = true;
          }
          break;

        case 'perfect_score': {
          const perfectScores = lessonProgress?.filter(lp => lp.score === 100).length || 0;
          if (perfectScores >= achievement.required_value) {
            shouldAward = true;
          }
          break;
        }

        default:
          break;
      }

      if (shouldAward) {
        const { data: awarded } = await awardAchievement(userId, achievement.achievement_key);
        if (awarded) {
          newAchievements.push({
            ...awarded,
            achievement_details: achievement,
          });
        }
      }
    }

    return { data: newAchievements, error: null };
  } catch (error) {
    console.error('Error checking and awarding achievements:', error);
    return { data: null, error };
  }
}

/**
 * Get achievement progress for a specific achievement
 * @param {string} userId - The user's ID
 * @param {string} achievementKey - The achievement's unique key
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getAchievementProgress(userId, achievementKey) {
  try {
    if (!userId || !achievementKey) {
      return { data: null, error: new Error('User ID and achievement key are required') };
    }

    const { data: achievement } = await supabase
      .from('achievements')
      .select('*')
      .eq('achievement_key', achievementKey)
      .single();

    if (!achievement) {
      return { data: null, error: new Error('Achievement not found') };
    }

    const { data: userAchievement } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .eq('achievement_key', achievementKey)
      .single();

    if (userAchievement) {
      return {
        data: {
          achievement,
          is_earned: true,
          current_value: achievement.required_value,
          progress_percentage: 100,
          earned_at: userAchievement.earned_at,
        },
        error: null,
      };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    let currentValue = 0;

    switch (achievement.category) {
      case 'streak':
        currentValue = profile?.current_streak || 0;
        break;
      case 'xp':
        currentValue = profile?.total_xp || 0;
        break;
      case 'study_time':
        currentValue = profile?.total_study_time || 0;
        break;
      case 'lessons': {
        const { data: lessonProgress } = await supabase
          .from('user_lesson_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('is_completed', true);
        currentValue = lessonProgress?.length || 0;
        break;
      }
      case 'vocabulary': {
        const { data: vocabularyProgress } = await supabase
          .from('user_vocabulary_progress')
          .select('*')
          .eq('user_id', userId)
          .gte('mastery_level', 6);
        currentValue = vocabularyProgress?.length || 0;
        break;
      }
      case 'perfect_score': {
        const { data: lessonProgress } = await supabase
          .from('user_lesson_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('score', 100);
        currentValue = lessonProgress?.length || 0;
        break;
      }
      default:
        break;
    }

    const progressPercentage = Math.min(
      Math.round((currentValue / achievement.required_value) * 100),
      100
    );

    return {
      data: {
        achievement,
        is_earned: false,
        current_value: currentValue,
        progress_percentage: progressPercentage,
        earned_at: null,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error fetching achievement progress:', error);
    return { data: null, error };
  }
}
