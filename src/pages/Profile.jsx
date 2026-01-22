import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { getUserProfile, getUserLessonStats, getVocabularyStats, getRecentActivities } from '../services';

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState([
    { label: 'Lessons Completed', value: '0', color: 'text-green-600' },
    { label: 'Current Streak', value: '0 days', color: 'text-orange-600' },
    { label: 'Total Study Time', value: '0m', color: 'text-blue-600' },
    { label: 'Vocabulary Words', value: '0', color: 'text-purple-600' },
  ]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfileData() {
      if (!user?.id) return;
      
      setLoading(true);
      setError(null);

      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await getUserProfile(user.id);
        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch lesson stats
        const { data: lessonStats, error: lessonError } = await getUserLessonStats(user.id);
        if (lessonError) throw lessonError;

        // Fetch vocabulary stats
        const { data: vocabStats, error: vocabError } = await getVocabularyStats(user.id);
        if (vocabError) throw vocabError;

        // Fetch recent activities
        const { data: activities, error: activitiesError } = await getRecentActivities(user.id, 7);
        if (activitiesError) throw activitiesError;

        // Update stats
        const hours = Math.floor((profileData?.total_study_time_minutes || 0) / 60);
        const minutes = (profileData?.total_study_time_minutes || 0) % 60;
        const studyTimeStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

        setStats([
          { 
            label: 'Lessons Completed', 
            value: lessonStats?.completed || '0', 
            color: 'text-green-600' 
          },
          { 
            label: 'Current Streak', 
            value: `${profileData?.streak_count || 0} days`, 
            color: 'text-orange-600' 
          },
          { 
            label: 'Total Study Time', 
            value: studyTimeStr, 
            color: 'text-blue-600' 
          },
          { 
            label: 'Vocabulary Words', 
            value: vocabStats?.mastered || '0', 
            color: 'text-purple-600' 
          },
        ]);

        // Format activities for display
        const formattedActivities = activities.map(activity => ({
          id: activity.id,
          activity: formatActivityText(activity.activity_type, activity.activity_data),
          time: formatTimeAgo(activity.created_at),
        }));
        setRecentActivity(formattedActivities);

      } catch (err) {
        console.error('Error loading profile:', err);
        setError(err.message || 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, [user]);

  const formatActivityText = (type, data) => {
    const typeMap = {
      lesson_completed: 'Completed lesson',
      vocab_reviewed: 'Reviewed vocabulary',
      ai_tutor_used: 'Practiced with AI Tutor',
      grammar_checker_used: 'Used Grammar Checker',
      quiz_completed: 'Completed quiz',
    };
    const baseText = typeMap[type] || 'Activity';
    const detail = data?.lesson_title || data?.quiz_name || '';
    return detail ? `${baseText}: "${detail}"` : baseText;
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">My Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="w-32 h-32 bg-indigo-100 dark:bg-indigo-900 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Profile" className="rounded-full" />
                ) : (
                  '👤'
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                {profile?.display_name || user?.email?.split('@')[0] || 'User'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{user?.email}</p>
              {profile?.proficiency_level && (
                <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full mb-4">
                  {profile.proficiency_level.charAt(0).toUpperCase() + profile.proficiency_level.slice(1)}
                </span>
              )}
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition mt-4">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.length > 0 ? (
                  recentActivity.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0">
                      <span className="text-gray-800 dark:text-gray-200">{item.activity}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{item.time}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No recent activity. Start learning to see your progress here!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
