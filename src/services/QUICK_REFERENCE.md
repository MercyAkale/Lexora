# Lexora Services - Quick Reference

## Import Services
```javascript
import { 
  getUserProfile, 
  completeLesson, 
  getWordsForReview 
} from './services';
```

## Common Patterns

### Profile Operations
```javascript
// Get profile
const { data: profile } = await getUserProfile(userId);

// Update streak (call on login/activity)
await updateStreak(userId);

// Add study time
await updateStudyTime(userId, 30); // 30 minutes
```

### Lesson Operations
```javascript
// Get lessons
const { data: lessons } = await getLessons({ 
  language: 'es', 
  difficulty: 'beginner' 
});

// Complete lesson
await completeLesson(userId, 'spanish-basics-1', 95);

// Get stats
const { data: stats } = await getUserLessonStats(userId);
```

### Vocabulary (SRS)
```javascript
// Get words to review
const { data: words } = await getWordsForReview(userId, 20);

// Update after review
await updateWordProgress(userId, wordId, isCorrect);

// Get stats
const { data: stats } = await getVocabularyStats(userId, 'es');
```

### Achievements
```javascript
// Check and award (call after major actions)
const { data: newAchievements } = await checkAndAwardAchievements(userId);

// Get user achievements
const { data: achievements } = await getUserAchievements(userId);
```

### Activity Logging
```javascript
// Log activity
await logActivity(userId, 'lesson_completed', {
  lesson_key: 'spanish-basics-1',
  score: 95,
  xp_earned: 950
});

// Get recent activities
const { data: activities } = await getRecentActivities(userId, 7);
```

### Study Sessions
```javascript
// Start session
const { data: session } = await startStudySession(userId);

// ... user studies ...

// End session
await endStudySession(session.id, {
  activities_completed: 5,
  xp_earned: 250,
  lessons_completed: 2,
  words_reviewed: 15
});
```

## Error Handling
```javascript
const { data, error } = await getUserProfile(userId);

if (error) {
  console.error('Error:', error.message);
  return;
}

// Use data safely
console.log(data);
```

## Best Practice Workflow

### User Login
```javascript
await updateStreak(userId);
await checkAndAwardAchievements(userId);
```

### Complete Lesson
```javascript
await completeLesson(userId, lessonKey, score);
await logActivity(userId, 'lesson_completed', { ... });
await updateStreak(userId);
await checkAndAwardAchievements(userId);
```

### Vocabulary Review
```javascript
const session = await startStudySession(userId);
const words = await getWordsForReview(userId, 20);

for (const word of words) {
  await updateWordProgress(userId, word.word_id, isCorrect);
  await logActivity(userId, 'word_reviewed', { ... });
}

await endStudySession(session.id, { ... });
await checkAndAwardAchievements(userId);
```

## Performance Tips

1. **Batch operations** when possible
2. **Use Promise.all()** for parallel requests
3. **Limit results** with limit parameters
4. **Clean up old data** periodically
5. **Check achievements** strategically (not on every action)

## Common Gotchas

❌ **Don't** call services without error checking
❌ **Don't** forget to update streaks on user activity
❌ **Don't** check achievements on every minor action
❌ **Don't** forget to end study sessions

✅ **Do** always check for errors
✅ **Do** update streaks on login/daily activity
✅ **Do** batch achievement checks after major milestones
✅ **Do** auto-end stale sessions periodically
