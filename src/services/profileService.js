import { supabase } from '../lib/supabaseClient.js';

/**
 * Get user profile by user ID
 * @param {string} userId - The user's ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getUserProfile(userId) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return { data: null, error: new Error('Profile not found') };
      }
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { data: null, error };
  }
}

/**
 * Create a new user profile
 * @param {string} userId - The user's ID
 * @param {Object} profileData - Profile data to create
 * @param {string} [profileData.username] - Username
 * @param {string} [profileData.display_name] - Display name
 * @param {string} [profileData.native_language] - Native language code
 * @param {string} [profileData.learning_language] - Learning language code
 * @param {string} [profileData.proficiency_level] - Proficiency level (beginner, intermediate, advanced)
 * @param {string} [profileData.avatar_url] - Avatar URL
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function createUserProfile(userId, profileData = {}) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const profile = {
      user_id: userId,
      username: profileData.username || null,
      display_name: profileData.display_name || null,
      native_language: profileData.native_language || 'en',
      learning_language: profileData.learning_language || null,
      proficiency_level: profileData.proficiency_level || 'beginner',
      avatar_url: profileData.avatar_url || null,
      total_xp: 0,
      current_streak: 0,
      longest_streak: 0,
      total_study_time: 0,
      last_active_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('user_profiles')
      .insert(profile)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { data: null, error };
  }
}

/**
 * Update user profile
 * @param {string} userId - The user's ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateUserProfile(userId, updates) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    if (!updates || Object.keys(updates).length === 0) {
      return { data: null, error: new Error('No updates provided') };
    }

    const updateData = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updateData)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return { data: null, error: new Error('Profile not found') };
      }
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { data: null, error };
  }
}

/**
 * Update user streak based on last active date
 * @param {string} userId - The user's ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateStreak(userId) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    const { data: profile, error: fetchError } = await getUserProfile(userId);
    if (fetchError) {
      return { data: null, error: fetchError };
    }

    if (!profile) {
      return { data: null, error: new Error('Profile not found') };
    }

    const today = new Date().toISOString().split('T')[0];
    const lastActiveDate = profile.last_active_date;

    if (lastActiveDate === today) {
      return { data: profile, error: null };
    }

    const lastDate = new Date(lastActiveDate);
    const currentDate = new Date(today);
    const daysDifference = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));

    let newStreak = profile.current_streak;

    if (daysDifference === 1) {
      newStreak += 1;
    } else if (daysDifference > 1) {
      newStreak = 1;
    }

    const longestStreak = Math.max(newStreak, profile.longest_streak);

    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        current_streak: newStreak,
        longest_streak: longestStreak,
        last_active_date: today,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error updating streak:', error);
    return { data: null, error };
  }
}

/**
 * Update total study time for user
 * @param {string} userId - The user's ID
 * @param {number} minutes - Minutes to add to total study time
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateStudyTime(userId, minutes) {
  try {
    if (!userId) {
      return { data: null, error: new Error('User ID is required') };
    }

    if (typeof minutes !== 'number' || minutes < 0) {
      return { data: null, error: new Error('Invalid minutes value') };
    }

    const { data: profile, error: fetchError } = await getUserProfile(userId);
    if (fetchError) {
      return { data: null, error: fetchError };
    }

    if (!profile) {
      return { data: null, error: new Error('Profile not found') };
    }

    const newTotalStudyTime = (profile.total_study_time || 0) + minutes;

    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        total_study_time: newTotalStudyTime,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error updating study time:', error);
    return { data: null, error };
  }
}
