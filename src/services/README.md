# Lexora API Services Documentation

This directory contains all the API service modules for the Lexora language learning application. Each service handles interactions with the Supabase backend for specific features.

## Table of Contents

- [Overview](#overview)
- [Services](#services)
  - [Profile Service](#profile-service)
  - [Lesson Service](#lesson-service)
  - [Vocabulary Service](#vocabulary-service)
  - [Achievement Service](#achievement-service)
  - [Activity Service](#activity-service)
  - [Study Session Service](#study-session-service)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Database Schema Requirements](#database-schema-requirements)

## Overview

All services follow a consistent pattern:
- Import `supabase` from `/src/lib/supabaseClient.js`
- Return `{ data, error }` objects
- Include comprehensive JSDoc comments
- Handle edge cases and validation
- Use try-catch for error handling

## Services

### Profile Service

**File:** `profileService.js`

Manages user profile data including XP, streaks, and study time.

#### Functions:

- **`getUserProfile(userId)`**
  - Get user profile by ID
  - Returns: Profile object or null

- **`createUserProfile(userId, profileData)`**
  - Create a new user profile
  - Parameters: `username`, `display_name`, `native_language`, `learning_language`, `proficiency_level`, `avatar_url`
  - Returns: Created profile

- **`updateUserProfile(userId, updates)`**
  - Update user profile fields
  - Parameters: Any profile fields to update
  - Returns: Updated profile

- **`updateStreak(userId)`**
  - Update user's streak based on last active date
  - Automatically calculates if streak should continue or reset
  - Updates `longest_streak` if applicable
  - Returns: Updated profile

- **`updateStudyTime(userId, minutes)`**
  - Add study time to user's total
  - Parameters: Minutes to add (number)
  - Returns: Updated profile

#### Example Usage:

```javascript
import { getUserProfile, updateStreak } from './services';

// Get user profile
const { data: profile, error } = await getUserProfile('user-123');

// Update streak
const { data: updatedProfile } = await updateStreak('user-123');
```

---

### Lesson Service

**File:** `lessonService.js`

Tracks lesson progress and statistics.

#### Functions:

- **`getLessons(filters)`**
  - Get lessons with optional filters
  - Filters: `language`, `category`, `difficulty`, `limit`
  - Returns: Array of lessons

- **`getLessonProgress(userId, lessonKey)`**
  - Get user's progress for a specific lesson
  - Returns: Progress object or null

- **`updateLessonProgress(userId, lessonKey, progressData)`**
  - Update or create lesson progress
  - Parameters: `progress_percentage`, `score`, `time_spent`, `completed_exercises`
  - Returns: Updated progress

- **`completeLesson(userId, lessonKey, score)`**
  - Mark lesson as completed
  - Updates attempts and best score
  - Returns: Completed lesson progress

- **`getUserLessonStats(userId)`**
  - Get comprehensive lesson statistics
  - Returns: Stats object with totals and averages

#### Example Usage:

```javascript
import { completeLesson, getUserLessonStats } from './services';

// Complete a lesson
const { data } = await completeLesson('user-123', 'spanish-basics-1', 95);

// Get user stats
const { data: stats } = await getUserLessonStats('user-123');
// stats: { total_lessons_completed, average_score, completion_rate, ... }
```

---

### Vocabulary Service

**File:** `vocabularyService.js`

Manages vocabulary learning with Spaced Repetition System (SRS).

#### Functions:

- **`getVocabularyWords(languageCode, category)`**
  - Get vocabulary words by language and optional category
  - Returns: Array of vocabulary words

- **`getUserVocabularyProgress(userId, languageCode)`**
  - Get user's progress for all words in a language
  - Returns: Array of progress records with word data

- **`getWordsForReview(userId, limit)`**
  - Get words due for review based on SRS algorithm
  - Default limit: 20 words
  - Returns: Array of words to review

- **`updateWordProgress(userId, wordId, isCorrect)`**
  - Update word progress after review
  - Adjusts mastery level based on correctness
  - Calculates next review date using SRS
  - Returns: Updated progress

- **`calculateNextReviewDate(masteryLevel)`**
  - SRS algorithm implementation (SuperMemo SM-2 based)
  - Levels 0-8 with increasing intervals
  - Returns: Date object for next review

- **`addWordToLearning(userId, wordId)`**
  - Add a new word to user's learning list
  - Returns: Created progress record

- **`getVocabularyStats(userId, languageCode)`**
  - Get vocabulary statistics
  - Returns: Stats with mastered, learning, and new words

#### SRS Intervals:

| Level | Interval |
|-------|----------|
| 0 | 1 minute |
| 1 | 5 minutes |
| 2 | 30 minutes |
| 3 | 3 hours |
| 4 | 12 hours |
| 5 | 1 day |
| 6 | 3 days |
| 7 | 1 week |
| 8 | 1 month |

#### Example Usage:

```javascript
import { getWordsForReview, updateWordProgress } from './services';

// Get words to review
const { data: words } = await getWordsForReview('user-123', 10);

// Update after review
const { data } = await updateWordProgress('user-123', 'word-456', true);
```

---

### Achievement Service

**File:** `achievementService.js`

Manages the achievements and gamification system.

#### Functions:

- **`getAchievements()`**
  - Get all available achievements
  - Returns: Array of achievement definitions

- **`getUserAchievements(userId)`**
  - Get user's earned achievements
  - Returns: Array with achievement details

- **`checkAndAwardAchievements(userId)`**
  - Check user progress and award applicable achievements
  - Automatically awards XP for new achievements
  - Categories: `streak`, `lessons`, `vocabulary`, `xp`, `study_time`, `perfect_score`
  - Returns: Array of newly awarded achievements

- **`getAchievementProgress(userId, achievementKey)`**
  - Get progress toward a specific achievement
  - Returns: Progress object with percentage and current value

#### Example Usage:

```javascript
import { checkAndAwardAchievements, getUserAchievements } from './services';

// Check and award after completing activities
const { data: newAchievements } = await checkAndAwardAchievements('user-123');

// Get all user achievements
const { data: achievements } = await getUserAchievements('user-123');
```

---

### Activity Service

**File:** `activityService.js`

Logs and tracks user activities for analytics and feeds.

#### Functions:

- **`logActivity(userId, activityType, activityData)`**
  - Log a user activity
  - Types: `lesson_started`, `lesson_completed`, `word_learned`, `word_reviewed`, `achievement_earned`, `streak_milestone`, `study_session_completed`, `quiz_completed`, `daily_goal_reached`
  - Parameters: `lesson_key`, `word_id`, `achievement_key`, `xp_earned`, `score`, `metadata`
  - Returns: Created activity

- **`getUserActivities(userId, limit)`**
  - Get user's recent activities
  - Default limit: 50, max: 100
  - Returns: Array of activities

- **`getRecentActivities(userId, days)`**
  - Get activities from last N days
  - Default: 7 days
  - Returns: Array of activities

- **`getActivityStats(userId, days)`**
  - Get comprehensive activity statistics
  - Includes daily breakdown and most active day
  - Returns: Stats object

- **`getActivitiesByType(userId, activityType, limit)`**
  - Filter activities by type
  - Returns: Array of filtered activities

- **`cleanupOldActivities(userId, daysToKeep)`**
  - Delete activities older than N days
  - Default: 90 days
  - Returns: Count of deleted activities

#### Example Usage:

```javascript
import { logActivity, getActivityStats } from './services';

// Log an activity
await logActivity('user-123', 'lesson_completed', {
  lesson_key: 'spanish-basics-1',
  score: 95,
  xp_earned: 100
});

// Get stats
const { data: stats } = await getActivityStats('user-123', 30);
```

---

### Study Session Service

**File:** `studySessionService.js`

Tracks study sessions for time management and analytics.

#### Functions:

- **`startStudySession(userId)`**
  - Start a new study session
  - Checks for existing active session
  - Returns: Session object

- **`endStudySession(sessionId, sessionStats)`**
  - End an active study session
  - Auto-calculates duration
  - Parameters: `activities_completed`, `xp_earned`, `lessons_completed`, `words_reviewed`, `metadata`
  - Returns: Completed session

- **`getActiveSession(userId)`**
  - Get user's current active session
  - Returns: Session object or null

- **`updateSessionProgress(sessionId, updates)`**
  - Update session progress while active
  - Returns: Updated session

- **`getSessionHistory(userId, limit)`**
  - Get user's session history
  - Default limit: 20
  - Returns: Array of sessions

- **`getSessionStats(userId, days)`**
  - Get session statistics
  - Default: 30 days
  - Returns: Comprehensive stats

- **`autoEndStaleSessions(userId, maxHours)`**
  - Auto-end sessions active for too long
  - Default: 24 hours
  - Returns: Array of ended sessions

#### Example Usage:

```javascript
import { startStudySession, endStudySession } from './services';

// Start session
const { data: session } = await startStudySession('user-123');

// ... user studies ...

// End session
await endStudySession(session.id, {
  activities_completed: 5,
  xp_earned: 250,
  lessons_completed: 2,
  words_reviewed: 15
});
```

---

## Usage

### Importing Services

```javascript
// Import specific functions
import { getUserProfile, updateStreak } from './services';

// Or import from specific service file
import { completeLesson } from './services/lessonService';
```

### Standard Response Format

All service functions return:

```javascript
{
  data: /* Result data or null */,
  error: /* Error object or null */
}
```

### Error Handling Pattern

```javascript
const { data, error } = await getUserProfile(userId);

if (error) {
  console.error('Error:', error.message);
  // Handle error
  return;
}

// Use data
console.log('Profile:', data);
```

---

## Database Schema Requirements

### Required Tables

1. **profiles**
   - `user_id` (uuid, primary key)
   - `username` (text)
   - `display_name` (text)
   - `native_language` (text)
   - `learning_language` (text)
   - `proficiency_level` (text)
   - `avatar_url` (text)
   - `total_xp` (integer)
   - `current_streak` (integer)
   - `longest_streak` (integer)
   - `total_study_time` (integer)
   - `last_active_date` (date)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

2. **lessons**
   - `id` (uuid, primary key)
   - `lesson_key` (text, unique)
   - `language_code` (text)
   - `category` (text)
   - `difficulty_level` (text)
   - `order_index` (integer)

3. **lesson_progress**
   - `id` (uuid, primary key)
   - `user_id` (uuid, foreign key)
   - `lesson_key` (text)
   - `progress_percentage` (integer)
   - `score` (integer)
   - `time_spent` (integer)
   - `is_completed` (boolean)
   - `completed_at` (timestamp)
   - `best_score` (integer)
   - `attempts` (integer)
   - `completed_exercises` (jsonb)
   - `last_accessed` (timestamp)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

4. **vocabulary**
   - `id` (uuid, primary key)
   - `word` (text)
   - `translation` (text)
   - `pronunciation` (text)
   - `example_sentence` (text)
   - `example_translation` (text)
   - `language_code` (text)
   - `category` (text)
   - `difficulty_level` (text)
   - `audio_url` (text)

5. **vocabulary_progress**
   - `id` (uuid, primary key)
   - `user_id` (uuid, foreign key)
   - `word_id` (uuid, foreign key)
   - `mastery_level` (integer)
   - `correct_count` (integer)
   - `incorrect_count` (integer)
   - `review_count` (integer)
   - `last_reviewed` (timestamp)
   - `next_review_date` (timestamp)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

6. **achievements**
   - `id` (uuid, primary key)
   - `achievement_key` (text, unique)
   - `title` (text)
   - `description` (text)
   - `category` (text)
   - `icon` (text)
   - `required_value` (integer)
   - `xp_reward` (integer)

7. **user_achievements**
   - `id` (uuid, primary key)
   - `user_id` (uuid, foreign key)
   - `achievement_key` (text)
   - `earned_at` (timestamp)

8. **activities**
   - `id` (uuid, primary key)
   - `user_id` (uuid, foreign key)
   - `activity_type` (text)
   - `lesson_key` (text)
   - `word_id` (uuid)
   - `achievement_key` (text)
   - `xp_earned` (integer)
   - `score` (integer)
   - `metadata` (jsonb)
   - `created_at` (timestamp)

9. **study_sessions**
   - `id` (uuid, primary key)
   - `user_id` (uuid, foreign key)
   - `start_time` (timestamp)
   - `end_time` (timestamp)
   - `duration_minutes` (integer)
   - `activities_completed` (integer)
   - `xp_earned` (integer)
   - `lessons_completed` (integer)
   - `words_reviewed` (integer)
   - `is_active` (boolean)
   - `metadata` (jsonb)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

### Recommended Indexes

```sql
-- Profiles
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_last_active ON profiles(last_active_date);

-- Lesson Progress
CREATE INDEX idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson_key ON lesson_progress(lesson_key);
CREATE UNIQUE INDEX idx_lesson_progress_user_lesson ON lesson_progress(user_id, lesson_key);

-- Vocabulary Progress
CREATE INDEX idx_vocab_progress_user_id ON vocabulary_progress(user_id);
CREATE INDEX idx_vocab_progress_next_review ON vocabulary_progress(next_review_date);
CREATE UNIQUE INDEX idx_vocab_progress_user_word ON vocabulary_progress(user_id, word_id);

-- Activities
CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_created_at ON activities(created_at);
CREATE INDEX idx_activities_type ON activities(activity_type);

-- Study Sessions
CREATE INDEX idx_study_sessions_user_id ON study_sessions(user_id);
CREATE INDEX idx_study_sessions_active ON study_sessions(user_id, is_active);
```

---

## Best Practices

1. **Always check for errors** before using data
2. **Validate inputs** before calling service functions
3. **Handle edge cases** (user not found, no data, etc.)
4. **Use transactions** for related operations when possible
5. **Log activities** for important user actions
6. **Update streaks** on user login/activity
7. **Check achievements** after completing activities
8. **Clean up old data** periodically (activities, sessions)

---

## Contributing

When adding new service functions:

1. Follow the existing pattern (`{ data, error }` returns)
2. Add comprehensive JSDoc comments
3. Include parameter validation
4. Use try-catch for error handling
5. Add to the index.js exports
6. Update this README

---

## License

Part of the Lexora language learning application.
