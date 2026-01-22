# Lexora Database Setup Guide

This guide will help you set up the Supabase database for the Lexora language learning application.

## Prerequisites

- A Supabase account ([supabase.com](https://supabase.com))
- Your Supabase project created

## Step 1: Create Your Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in project details:
   - Name: `lexora` (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose closest to your users
4. Wait for project to be created (~2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 3: Configure Environment Variables

1. In your Lexora project root, create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

2. Edit `.env` and add your Supabase credentials:

```env
VITE_APP_ENV=development
VITE_PUBLIC_BASE_URL=http://localhost:5173
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Run Database Migrations

### Option A: Using Supabase Dashboard (Recommended for first-time setup)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/schema.sql`
5. Paste into the SQL editor
6. Click **Run** or press `Ctrl+Enter` (Cmd+Enter on Mac)
7. Wait for the query to complete successfully

### Option B: Using Supabase CLI (For developers)

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
supabase link --project-ref your-project-id
```

4. Run the migration:
```bash
supabase db push
```

## Step 5: Verify Database Setup

After running the schema, verify that all tables were created:

1. In Supabase Dashboard, go to **Table Editor**
2. You should see these tables:
   - `user_profiles`
   - `lessons`
   - `user_lesson_progress`
   - `vocabulary_words`
   - `user_vocabulary_progress`
   - `achievements`
   - `user_achievements`
   - `study_sessions`
   - `user_activities`
   - `user_preferences`

## Step 6: Seed Initial Data (Optional)

### Add Sample Lessons

Run this SQL in the SQL Editor to add sample lessons:

```sql
INSERT INTO lessons (lesson_key, title, description, category, difficulty_level, estimated_time_minutes, order_index) VALUES
  ('alphabet-numbers', 'Alphabet & Numbers', 'Learn the alphabet and basic numbers', 'vocabulary', 'beginner', 15, 1),
  ('basic-vocab', 'Basic Vocabulary', 'Essential everyday words', 'vocabulary', 'beginner', 20, 2),
  ('common-phrases', 'Common Phrases', 'Useful expressions for daily conversations', 'vocabulary', 'beginner', 20, 3),
  ('subject-pronouns', 'Subject Pronouns', 'Learn personal pronouns', 'grammar', 'beginner', 15, 4),
  ('verb-conjugation', 'Verb Conjugation', 'Master verb forms and tenses', 'grammar', 'intermediate', 30, 5),
  ('daily-conversation', 'Daily Conversation', 'Practice everyday dialogues', 'conversation', 'intermediate', 25, 6),
  ('advanced-grammar', 'Advanced Grammar', 'Complex grammatical structures', 'grammar', 'advanced', 35, 7);
```

### Add Sample Achievements

```sql
INSERT INTO achievements (achievement_key, title, description, icon, category, requirement_type, requirement_value) VALUES
  ('first-lesson', 'First Steps', 'Complete your first lesson', '🎯', 'lesson', 'lesson_count', 1),
  ('week-streak', '7-Day Streak', 'Maintain a 7-day learning streak', '🔥', 'streak', 'streak_days', 7),
  ('vocab-master-10', 'Vocab Apprentice', 'Master 10 vocabulary words', '📚', 'vocabulary', 'vocab_mastered', 10),
  ('vocab-master-50', 'Vocab Expert', 'Master 50 vocabulary words', '🎓', 'vocabulary', 'vocab_mastered', 50),
  ('lesson-master-5', 'Dedicated Learner', 'Complete 5 lessons', '⭐', 'lesson', 'lesson_count', 5),
  ('lesson-master-20', 'Language Scholar', 'Complete 20 lessons', '🏆', 'lesson', 'lesson_count', 20);
```

## Step 7: Test the Connection

1. Start your Lexora app:
```bash
npm run dev
```

2. Try to sign up for a new account
3. Check your Supabase dashboard → **Authentication** to see if the user was created
4. Go to **Table Editor** → **user_profiles** to verify the profile was created

## Troubleshooting

### Error: "Missing environment variables"
- Make sure your `.env` file is in the project root
- Restart your development server after changing `.env`
- Verify the variable names start with `VITE_` (required for Vite)

### Error: "relation does not exist"
- The database tables weren't created properly
- Re-run the schema.sql script in Supabase SQL Editor
- Check for any error messages in the SQL Editor

### Error: "Invalid API key"
- Double-check you copied the **anon** key (not the service_role key)
- Make sure there are no extra spaces in your `.env` file
- The key should be very long (~200 characters)

### Error: "Row Level Security policy violated"
- RLS policies are enabled but user isn't authenticated
- Make sure you're signed in before accessing protected resources
- Check that your auth session is valid

## Row Level Security (RLS)

All tables have Row Level Security enabled to protect user data:

- Users can only access their own data
- Public tables (lessons, vocabulary, achievements) are readable by everyone
- User-specific tables require authentication

## Backup and Migrations

### Creating a Backup

In Supabase Dashboard:
1. Go to **Database** → **Backups**
2. Click **Backup now** to create a manual backup
3. Daily backups are automatic on paid plans

### Creating Migrations

When you need to update the schema:

1. Make changes in a new SQL file: `supabase/migrations/YYYYMMDD_description.sql`
2. Run via SQL Editor or Supabase CLI
3. Commit the migration file to version control

## Production Deployment

### Environment Variables for Production

Update your `.env.production` or deployment platform:

```env
VITE_APP_ENV=production
VITE_PUBLIC_BASE_URL=https://yourdomain.com
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Performance Tips

1. **Enable Connection Pooling**: In Supabase Dashboard → Settings → Database
2. **Monitor Usage**: Check Database → Reports regularly
3. **Optimize Queries**: Use the Query Performance tab
4. **Add Indexes**: Already included in schema.sql, but add more as needed

### Security Checklist

- [ ] RLS policies enabled on all user tables
- [ ] Service role key kept secure (never exposed to client)
- [ ] Email verification enabled (Supabase → Authentication → Settings)
- [ ] Rate limiting configured (Supabase → Authentication → Rate Limits)
- [ ] CORS configured for production domain

## Next Steps

1. ✅ Database is set up
2. 📊 Populate with your lesson content
3. 🔐 Configure authentication settings
4. 🚀 Deploy your app
5. 📈 Monitor usage and performance

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Lexora GitHub**: [Your repo URL]
- **Issues**: Report bugs in GitHub Issues

---

For more information about the services and API, see `/src/services/README.md`
