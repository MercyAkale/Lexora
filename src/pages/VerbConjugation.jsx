import { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function VerbConjugation() {
  const [completed, setCompleted] = useState(false);
  const [newVerb, setNewVerb] = useState('');

  // Conjugation table for "hablar" across 4 tenses + gerund
  const conjugationData = {
    present: ['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan'],
    preterite: ['hablé', 'hablaste', 'habló', 'hablamos', 'hablasteis', 'hablaron'],
    imperfect: ['hablaba', 'hablabas', 'hablaba', 'hablábamos', 'hablabais', 'hablaban'],
    future: ['hablaré', 'hablarás', 'hablará', 'hablaremos', 'hablaréis', 'hablarán'],
    gerund: ['hablando', 'hablando', 'hablando', 'hablando', 'hablando', 'hablando'],
  };

  const persons = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos/ellas'];

  const examples = [
    'Yo hablo español todos los días. (Present tense)',
    'Ayer hablé con mi profesor sobre la tarea. (Preterite tense)',
    'Cuando era niño, hablaba francés con fluidez. (Imperfect tense)',
    'Estoy hablando español ahora. (Gerund - Present continuous)',
    'Yo vivo en España y hablo español. (Country example with proper noun)',
  ];

  const handleConjugateVerb = () => {
    if (newVerb.trim()) {
      alert(`Feature coming soon! You want to conjugate: "${newVerb}"\n\nThis will show conjugation tables for your chosen verb.`);
      console.log('Verb to conjugate:', newVerb);
    } else {
      alert('Please enter a verb to conjugate.');
    }
  };

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
              Verb Conjugation Practice
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
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Hablar (to speak)
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-indigo-100 dark:bg-indigo-900">
                    <th className="border border-indigo-300 dark:border-indigo-700 px-4 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      Person
                    </th>
                    <th className="border border-indigo-300 dark:border-indigo-700 px-4 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      Present
                    </th>
                    <th className="border border-indigo-300 dark:border-indigo-700 px-4 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      Preterite
                    </th>
                    <th className="border border-indigo-300 dark:border-indigo-700 px-4 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      Imperfect
                    </th>
                    <th className="border border-indigo-300 dark:border-indigo-700 px-4 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      Future Simple
                    </th>
                    <th className="border border-indigo-300 dark:border-indigo-700 px-4 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      Gerund (-ando/-iendo)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {persons.map((person, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
                    >
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 capitalize">
                        {person}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-indigo-600 dark:text-teal-400 font-bold">
                        {conjugationData.present[index]}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-indigo-600 dark:text-teal-400 font-bold">
                        {conjugationData.preterite[index]}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-indigo-600 dark:text-teal-400 font-bold">
                        {conjugationData.imperfect[index]}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-indigo-600 dark:text-teal-400 font-bold">
                        {conjugationData.future[index]}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-purple-600 dark:text-purple-400 font-bold">
                        {conjugationData.gerund[index]}
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
            <div className="space-y-4">
              {examples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-indigo-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-2xl">💬</span>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{example}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Gerund Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="bg-purple-50 dark:bg-purple-900/30 rounded-xl shadow-lg p-8 mb-8 border-2 border-purple-200 dark:border-purple-700"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span>💡</span> Gerund Tips
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span><strong>Use gerunds for ongoing actions:</strong> "I am speaking" → "Estoy hablando"</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span><strong>Formation:</strong> -ar verbs use -ando (hablar → hablando), -er/-ir verbs use -iendo (comer → comiendo)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span><strong>Common with estar:</strong> "Estoy trabajando" (I am working), "Estás comiendo" (You are eating)</span>
              </p>
            </div>
          </motion.div>

          {/* Interactive Conjugation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-gradient-to-r from-indigo-100 to-teal-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Practice: Conjugate Another Verb
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Enter a Spanish verb in infinitive form (e.g., comer, vivir, estudiar) to see its conjugations:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newVerb}
                onChange={(e) => setNewVerb(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConjugateVerb()}
                placeholder="Enter verb (e.g., comer)"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-indigo-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-teal-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConjugateVerb}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition"
              >
                Conjugate Verb
              </motion.button>
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
