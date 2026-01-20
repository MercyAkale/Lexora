import { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function BasicVocab() {
  const [completed, setCompleted] = useState(false);

  const vocabulary = [
    { id: 1, spanish: 'Hola', english: 'Hello', example: 'Hola, ¿cómo estás?' },
    { id: 2, spanish: 'Adiós', english: 'Goodbye', example: 'Adiós, hasta luego.' },
    { id: 3, spanish: 'Gracias', english: 'Thank you', example: 'Gracias por tu ayuda.' },
    { id: 4, spanish: 'Por favor', english: 'Please', example: 'Por favor, ayúdame.' },
    { id: 5, spanish: 'Sí', english: 'Yes', example: 'Sí, estoy de acuerdo.' },
    { id: 6, spanish: 'No', english: 'No', example: 'No, no puedo ir.' },
    { id: 7, spanish: 'Agua', english: 'Water', example: 'Necesito un vaso de agua.' },
    { id: 8, spanish: 'Comida', english: 'Food', example: 'La comida está deliciosa.' },
    { id: 9, spanish: 'Casa', english: 'House', example: 'Mi casa es muy grande.' },
    { id: 10, spanish: 'Amigo', english: 'Friend', example: 'Él es mi mejor amigo.' },
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
              Basic Vocabulary Lesson
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

          <div className="grid gap-6">
            {vocabulary.map((word, index) => (
              <motion.div
                key={word.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Spanish</p>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-teal-400">
                      {word.spanish}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">English</p>
                    <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {word.english}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Example</p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                      {word.example}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-indigo-100 dark:bg-indigo-900 rounded-xl p-6">
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
              Progress: 75%
            </h3>
            <div className="w-full bg-indigo-200 dark:bg-indigo-700 rounded-full h-3">
              <div className="bg-indigo-600 dark:bg-teal-500 h-3 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BasicVocab;
