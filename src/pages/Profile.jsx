function Profile() {
  const stats = [
    { label: 'Lessons Completed', value: '24', color: 'text-green-600' },
    { label: 'Current Streak', value: '7 days', color: 'text-orange-600' },
    { label: 'Total Study Time', value: '12h 30m', color: 'text-blue-600' },
    { label: 'Vocabulary Words', value: '156', color: 'text-purple-600' },
  ];

  const recentActivity = [
    { id: 1, activity: 'Completed "Basic Vocabulary"', time: '2 hours ago' },
    { id: 2, activity: 'Practiced with AI Tutor', time: '1 day ago' },
    { id: 3, activity: 'Used Grammar Checker', time: '2 days ago' },
    { id: 4, activity: 'Started "Common Phrases"', time: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-32 h-32 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
                👤
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">John Doe</h2>
              <p className="text-gray-600 mb-4">john.doe@example.com</p>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0">
                    <span className="text-gray-800">{item.activity}</span>
                    <span className="text-gray-500 text-sm">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
