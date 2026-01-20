import { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function VerbConjugation() {
  const [completed, setCompleted] = useState(false);

  const conjugations = [
    { pronoun: 'Yo', spanish: 'hablo', english: 'I speak' },
    { pronoun: 'Tú', spanish: 'hablas', english: 'You speak (informal)' },
    { pronoun: 'Él/Ella/Usted', spanish: 'habla', english: 'He/She speaks, You speak (formal)' },
    { pronoun: 'Nosotros', spanish: 'hablamos', english: 'We speak' },
    { pronoun: 'Vosotros', spanish: 'habláis', english: 'You all speak (Spain)' },
    { pronoun: 'Ellos/Ellas/Ustedes', spanish: 'hablan', english: 'They speak, You all speak' },
  ];

  const examples = [
    'Yo hablo español todos los días.',
    'Tú hablas muy bien inglés.',
    'Ella habla con su madre por teléfono.',
    'Nosotros hablamos de nuestros planes.',
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
              Verb Conjugation Lesson
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Hablar (to speak) - Present Tense
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-indigo-100 dark:bg-indigo-900">
                    <th className="border border-indigo-300 dark:border-indigo-700 px-6 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      Pronoun
                    </th>
                    <th className="border border-indigo-300 dark:border-indigo-700 px-6 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      Conjugation
                    </th>
                    <th className="border border-indigo-300 dark:border-indigo-700 px-6 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      English
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {conjugations.map((conj, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
                    >
                      <td className="border border-gray-300 dark:border-gray-600 px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                        {conj.pronoun}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-6 py-4 text-indigo-600 dark:text-teal-400 font-bold text-xl">
                        {conj.spanish}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-6 py-4 text-gray-600 dark:text-gray-400">
                        {conj.english}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Example Sentences
            </h3>
            <div className="space-y-3">
              {examples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-2xl">💬</span>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{example}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="bg-indigo-100 dark:bg-indigo-900 rounded-xl p-6">
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
              Progress: 30%
            </h3>
            <div className="w-full bg-indigo-200 dark:bg-indigo-700 rounded-full h-3">
              <div className="bg-indigo-600 dark:bg-teal-500 h-3 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default VerbConjugation;
