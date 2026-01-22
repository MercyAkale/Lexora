/**
 * Example Usage of Lexora API Services
 * 
 * This file demonstrates how to use the various service modules
 * in a real application context.
 */

import {
  // Profile Service
  getUserProfile,
  createUserProfile,
  updateStreak,
  
  // Lesson Service
  getLessons,
  completeLesson,
  getUserLessonStats,
  
  // Vocabulary Service
  getWordsForReview,
  updateWordProgress,
  getVocabularyStats,
  
  // Achievement Service
  checkAndAwardAchievements,
  getUserAchievements,
  
  // Activity Service
  logActivity,
  getRecentActivities,
  
  // Study Session Service
  startStudySession,
  endStudySession,
} from './index.js';

/**
 * Example: Complete user onboarding flow
 */
async function handleUserOnboarding(userId, userData) {
  // Create user profile
  const { data: profile, error } = await createUserProfile(userId, {
    username: userData.username,
    display_name: userData.displayName,
    native_language: 'en',
    learning_language: userData.learningLanguage,
    proficiency_level: 'beginner',
  });

  if (error) {
    console.error('Failed to create profile:', error);
    return { success: false, error };
  }

  // Log activity
  await logActivity(userId, 'account_created', {
    metadata: { language: userData.learningLanguage },
  });

  return { success: true, profile };
}

/**
 * Example: Complete a lesson workflow
 */
async function handleLessonCompletion(userId, lessonKey, score) {
  // Complete the lesson
  const { data: progress, error } = await completeLesson(userId, lessonKey, score);

  if (error) {
    console.error('Failed to complete lesson:', error);
    return { success: false, error };
  }

  // Calculate XP (example: 10 XP per point)
  const xpEarned = score * 10;

  // Log the activity
  await logActivity(userId, 'lesson_completed', {
    lesson_key: lessonKey,
    score,
    xp_earned: xpEarned,
  });

  // Update user's streak
  await updateStreak(userId);

  // Check for new achievements
  const { data: newAchievements } = await checkAndAwardAchievements(userId);

  return {
    success: true,
    progress,
    xpEarned,
    newAchievements: newAchievements || [],
  };
}

/**
 * Example: Daily vocabulary review session
 */
async function handleVocabularyReview(userId) {
  // Start study session
  const { data: session } = await startStudySession(userId);

  if (!session) {
    return { success: false, error: 'Failed to start session' };
  }

  // Get words to review
  const { data: words } = await getWordsForReview(userId, 20);

  if (!words || words.length === 0) {
    await endStudySession(session.id, {
      activities_completed: 0,
      words_reviewed: 0,
    });
    return { success: true, message: 'No words to review' };
  }

  // Simulate review (in real app, this would be user interaction)
  let correctCount = 0;
  
  for (const wordProgress of words) {
    // Example: User reviews the word
    const isCorrect = Math.random() > 0.3; // Simulated user response
    
    if (isCorrect) correctCount++;

    // Update word progress
    await updateWordProgress(userId, wordProgress.word_id, isCorrect);

    // Log activity
    await logActivity(userId, 'word_reviewed', {
      word_id: wordProgress.word_id,
      is_correct: isCorrect,
    });
  }

  // End study session
  const xpEarned = correctCount * 5;
  await endStudySession(session.id, {
    activities_completed: words.length,
    words_reviewed: words.length,
    xp_earned: xpEarned,
  });

  // Update streak and check achievements
  await updateStreak(userId);
  await checkAndAwardAchievements(userId);

  return {
    success: true,
    wordsReviewed: words.length,
    correctCount,
    accuracy: Math.round((correctCount / words.length) * 100),
    xpEarned,
  };
}

/**
 * Example: Get user dashboard data
 */
async function getUserDashboard(userId) {
  // Fetch all relevant data in parallel
  const [
    profileResult,
    lessonStatsResult,
    vocabStatsResult,
    achievementsResult,
    recentActivitiesResult,
  ] = await Promise.all([
    getUserProfile(userId),
    getUserLessonStats(userId),
    getVocabularyStats(userId),
    getUserAchievements(userId),
    getRecentActivities(userId, 7),
  ]);

  // Check for errors
  if (profileResult.error) {
    return { success: false, error: 'Failed to load profile' };
  }

  return {
    success: true,
    dashboard: {
      profile: profileResult.data,
      stats: {
        lessons: lessonStatsResult.data,
        vocabulary: vocabStatsResult.data,
      },
      achievements: achievementsResult.data || [],
      recentActivities: recentActivitiesResult.data || [],
    },
  };
}

/**
 * Example: Start a learning session with lessons
 */
async function startLearningSession(userId, languageCode) {
  // Start session
  const { data: session } = await startStudySession(userId);

  if (!session) {
    return { success: false, error: 'Failed to start session' };
  }

  // Get available lessons
  const { data: lessons } = await getLessons({
    language: languageCode,
    difficulty: 'beginner',
    limit: 10,
  });

  return {
    success: true,
    session,
    availableLessons: lessons || [],
  };
}

/**
 * Example: Daily login routine
 */
async function handleDailyLogin(userId) {
  // Update streak
  const { data: profile } = await updateStreak(userId);

  // Check for milestone achievements
  const { data: newAchievements } = await checkAndAwardAchievements(userId);

  // Log login activity
  await logActivity(userId, 'daily_login', {
    current_streak: profile?.current_streak,
  });

  return {
    success: true,
    currentStreak: profile?.current_streak || 0,
    newAchievements: newAchievements || [],
  };
}

// Export example functions for use in application
export {
  handleUserOnboarding,
  handleLessonCompletion,
  handleVocabularyReview,
  getUserDashboard,
  startLearningSession,
  handleDailyLogin,
};
