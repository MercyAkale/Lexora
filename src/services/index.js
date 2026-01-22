/**
 * Lexora API Services
 * Centralized exports for all service modules
 */

// Profile Service
export {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  updateStreak,
  updateStudyTime,
} from './profileService.js';

// Lesson Service
export {
  getLessons,
  getLessonProgress,
  updateLessonProgress,
  completeLesson,
  getUserLessonStats,
} from './lessonService.js';

// Vocabulary Service
export {
  getVocabularyWords,
  getUserVocabularyProgress,
  getWordsForReview,
  updateWordProgress,
  calculateNextReviewDate,
  addWordToLearning,
  getVocabularyStats,
} from './vocabularyService.js';

// Achievement Service
export {
  getAchievements,
  getUserAchievements,
  checkAndAwardAchievements,
  getAchievementProgress,
} from './achievementService.js';

// Activity Service
export {
  logActivity,
  getUserActivities,
  getRecentActivities,
  getActivityStats,
  getActivitiesByType,
  cleanupOldActivities,
} from './activityService.js';

// Study Session Service
export {
  startStudySession,
  endStudySession,
  getActiveSession,
  updateSessionProgress,
  getSessionHistory,
  getSessionStats,
  autoEndStaleSessions,
} from './studySessionService.js';

// Auth Service
export {
  sendPasswordResetEmail,
  updatePassword,
  resendVerificationEmail,
  updateEmail,
  signOut,
  getSession,
  getCurrentUser,
  deleteAccount,
} from './authService.js';
