// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function GrammarTools() {
  const tools = [
    {
      id: 1,
      title: 'Verbs & Tenses',
      description: 'Master verb conjugations across all tenses with interactive practice',
      icon: '⚙️',
      color: 'from-blue-500 to-cyan-500',
      link: '/verbs-tenses'
    },
    {
      id: 2,
      title: 'Sentence Builder',
      description: 'Build perfect sentences with drag-and-drop word blocks',
      icon: '🏗️',
      color: 'from-purple-500 to-pink-500',
      link: '/sentence-builder'
    },
    {
      id: 3,
      title: 'Conjunctions',
      description: 'Learn connectors and practice with interactive exercises',
      icon: '🔗',
      color: 'from-teal-500 to-green-500',
      link: '/conjunctions'
    },
    {
      id: 4,
      title: 'Grammar Checker',
      description: 'Check your sentences for grammatical errors',
      icon: '✓',
      color: 'from-green-500 to-emerald-500',
      link: null
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-2">
            Grammar Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Master grammar with interactive tools and exercises
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              {tool.link ? (
                <Link to={tool.link}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all h-full border border-transparent hover:border-indigo-200 dark:hover:border-teal-500">
                    <div className="flex items-start gap-4">
                      <div className={`bg-gradient-to-br ${tool.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-md`}>
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                          {tool.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {tool.description}
                        </p>
                        <span className="text-indigo-600 dark:text-teal-400 font-semibold hover:text-indigo-700 dark:hover:text-teal-300 transition">
                          Try it now →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all h-full cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`bg-gradient-to-br ${tool.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-md`}>
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {tool.description}
                      </p>
                      <span className="text-indigo-600 dark:text-teal-400 font-semibold hover:text-indigo-700 dark:hover:text-teal-300 transition">
                        Coming soon
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Quick Grammar Check
          </h2>
          <textarea
            placeholder="Enter your text here to check for grammar errors..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 h-40 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors"
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Check Grammar
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default GrammarTools;
