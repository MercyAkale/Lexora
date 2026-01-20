import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Home() {
  const features = [
    {
      icon: '📚',
      title: 'Interactive Lessons',
      description: 'Engage with structured lessons designed to improve your language skills at your own pace.',
      link: '/lessons'
    },
    {
      icon: '🤖',
      title: 'AI Tutor',
      description: 'Get personalized help from our AI tutor, available 24/7 to answer your questions.',
      link: '/ai-tutor'
    },
    {
      icon: '✍️',
      title: 'Grammar Tools',
      description: 'Master grammar with interactive exercises and instant feedback on your progress.',
      link: '/grammar-tools'
    }
  ];

  const stats = [
    { label: 'Day Streak', value: '7', icon: '🔥' },
    { label: 'Lessons Completed', value: '12', icon: '✅' },
    { label: 'Words Learned', value: '143', icon: '📝' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-teal-500 to-indigo-600 bg-clip-text text-transparent mb-4">
            Welcome to Lexora
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-2">
            Flow into Fluency
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
            Your AI-powered language learning companion
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/lessons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition"
              >
                Get Started
              </motion.button>
            </Link>
            <Link to="/ai-tutor">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-teal-400 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 dark:border-teal-500 hover:bg-indigo-50 dark:hover:bg-gray-700 transition shadow-md"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-indigo-600 dark:text-teal-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Link to={feature.link}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all h-full border border-transparent hover:border-indigo-200 dark:hover:border-teal-500">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
