import { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function CommonPhrases() {
  const [completed, setCompleted] = useState(false);

  const phrases = [
    { id: 1, spanish: '¿Cómo estás?', english: 'How are you?', context: 'Informal greeting' },
    { id: 2, spanish: '¿Dónde está el baño?', english: 'Where is the bathroom?', context: 'Asking for directions' },
    { id: 3, spanish: 'No entiendo', english: "I don't understand", context: 'Expressing confusion' },
    { id: 4, spanish: '¿Cuánto cuesta?', english: 'How much does it cost?', context: 'Shopping' },
    { id: 5, spanish: 'Me llamo...', english: 'My name is...', context: 'Introduction' },
    { id: 6, spanish: 'Mucho gusto', english: 'Nice to meet you', context: 'First meeting' },
    { id: 7, spanish: '¿Hablas inglés?', english: 'Do you speak English?', context: 'Language inquiry' },
    { id: 8, spanish: 'Tengo hambre', english: 'I am hungry', context: 'Expressing need' },
    { id: 9, spanish: 'Hasta mañana', english: 'See you tomorrow', context: 'Farewell' },
    { id: 10, spanish: '¿Qué hora es?', english: 'What time is it?', context: 'Asking for time' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/lessons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-indigo-600 dark:text-teal-400 hover:text-indigo-700 dark:hover:text-teal-300 font-semibold"
            >
              <span>←</span> Back to Lessons
            </motion.button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-teal-500 to-indigo-600 bg-clip-text text-transparent">
              Common Phrases Lesson
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCompleted(!completed)}
              className={`px-6 py-2 rounded-lg font-semibold shadow-md transition ${
                completed
                  ? 'bg-green-600 text-white'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {completed ? '✓ Completed' : 'Mark as Completed'}
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {phrases.map((phrase, index) => (
              <motion.div
                key={phrase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 mb-3">
                    {phrase.context}
                  </span>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-teal-400 mb-2">
                    {phrase.spanish}
                  </p>
                  <p className="text-xl text-gray-700 dark:text-gray-300">
                    {phrase.english}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-indigo-100 dark:bg-indigo-900 rounded-xl p-6">
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
              Progress: 50%
            </h3>
            <div className="w-full bg-indigo-200 dark:bg-indigo-700 rounded-full h-3">
              <div className="bg-indigo-600 dark:bg-teal-500 h-3 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CommonPhrases;
