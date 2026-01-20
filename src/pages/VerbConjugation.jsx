import { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Accordion from '../components/ui/Accordion';
import Tooltip from '../components/ui/Tooltip';
import LevelBadge from '../components/ui/LevelBadge';
import { useLanguageStore } from '../stores/languageStore';
import { gerundData } from '../data/gerundData';
import { countryExamples } from '../data/countryExamples';
import { translations } from '../data/translationData';

function VerbConjugation() {
  const [completed, setCompleted] = useState(false);
  const [newVerb, setNewVerb] = useState('');
  const { selectedLanguage } = useLanguageStore();

  // Get language-specific data
  const languageCode = selectedLanguage.code;
  const speakVerb = translations.verbs[languageCode]?.speak || translations.verbs.es.speak;
  const persons = translations.pronouns[languageCode] || translations.pronouns.es;
  const currentGerundData = gerundData[languageCode] || gerundData.es;
  const currentCountryExamples = countryExamples[languageCode] || countryExamples.es;

  // Conjugation table for "speak" verb - language aware
  const conjugationData = {
    present: speakVerb.translations,
    preterite: languageCode === 'es' ? ['hablé', 'hablaste', 'habló', 'hablamos', 'hablasteis', 'hablaron'] : speakVerb.translations,
    imperfect: languageCode === 'es' ? ['hablaba', 'hablabas', 'hablaba', 'hablábamos', 'hablabais', 'hablaban'] : speakVerb.translations,
    future: languageCode === 'es' ? ['hablaré', 'hablarás', 'hablará', 'hablaremos', 'hablaréis', 'hablarán'] : speakVerb.translations,
    gerund: [speakVerb.gerund, speakVerb.gerund, speakVerb.gerund, speakVerb.gerund, speakVerb.gerund, speakVerb.gerund],
  };

  // Generate examples based on language
  const generateExamples = () => {
    if (languageCode === 'es') {
      return [
        'Yo hablo español todos los días. (Present tense)',
        'Ayer hablé con mi profesor sobre la tarea. (Preterite tense)',
        'Cuando era niño, hablaba francés con fluidez. (Imperfect tense)',
        'Estoy hablando español ahora. (Gerund - Present continuous)',
        ...currentCountryExamples.slice(0, 2).map(ex => `${ex.sentence} - ${ex.translation}`),
      ];
    } else if (languageCode === 'fr') {
      return [
        'Je parle français tous les jours. (Present tense)',
        'Je suis en train de parler français maintenant. (Present continuous)',
        ...currentCountryExamples.slice(0, 3).map(ex => `${ex.sentence} - ${ex.translation}`),
      ];
    } else if (languageCode === 'it') {
      return [
        'Parlo italiano tutti i giorni. (Present tense)',
        'Sto parlando italiano adesso. (Present continuous)',
        ...currentCountryExamples.slice(0, 3).map(ex => `${ex.sentence} - ${ex.translation}`),
      ];
    } else {
      return currentCountryExamples.slice(0, 3).map(ex => `${ex.sentence} - ${ex.translation}`);
    }
  };

  const examples = generateExamples();

  // Helper function to get the language-specific text from example objects
  const getExampleText = (example) => {
    return example[Object.keys(example)[0]];
  };

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
              {speakVerb.infinitive} (to speak) - {selectedLanguage.flag} {selectedLanguage.name}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-indigo-100 dark:bg-indigo-900">
                    <th className="border border-indigo-300 dark:border-indigo-700 px-4 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      Person
                    </th>
                    <th className="border border-indigo-300 dark:border-indigo-700 px-4 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      <Tooltip content="The present tense is used for actions happening now or habitual actions">
                        Present
                      </Tooltip>
                    </th>
                    <th className="border border-indigo-300 dark:border-indigo-700 px-4 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      <Tooltip content="Past tense for completed actions">
                        {languageCode === 'es' ? 'Preterite' : 'Past'}
                      </Tooltip>
                    </th>
                    <th className="border border-indigo-300 dark:border-indigo-700 px-4 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      <Tooltip content="Past tense for ongoing or habitual actions in the past">
                        {languageCode === 'es' ? 'Imperfect' : 'Past Continuous'}
                      </Tooltip>
                    </th>
                    <th className="border border-indigo-300 dark:border-indigo-700 px-4 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      <Tooltip content="Future tense for actions that will happen">
                        Future
                      </Tooltip>
                    </th>
                    <th className="border border-indigo-300 dark:border-indigo-700 px-4 py-3 text-left text-indigo-800 dark:text-indigo-200 font-semibold">
                      <Tooltip content={`The ${currentGerundData.name} form expresses ongoing actions`}>
                        {currentGerundData.name} ({currentGerundData.ending})
                      </Tooltip>
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

          {/* Educational Accordion Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-4 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span>📚</span> Learning Levels
              </h3>
              <div className="flex gap-2">
                <LevelBadge level="beginner" />
                <LevelBadge level="intermediate" />
                <LevelBadge level="advanced" />
              </div>
            </div>

            <Accordion 
              title={currentGerundData.beginner.title} 
              level="beginner"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  {currentGerundData.beginner.explanation}
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 dark:text-white">Examples:</h4>
                  {currentGerundData.beginner.examples.map((example, idx) => (
                    <div key={idx} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {getExampleText(example)}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {example.english}
                      </p>
                      {example.verb && (
                        <p className="text-green-600 dark:text-green-400 text-xs mt-1 font-mono">
                          {example.verb}
                        </p>
                      )}
                      {example.note && (
                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1 italic">
                          💡 {example.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Accordion>

            <Accordion 
              title={currentGerundData.intermediate.title}
              level="intermediate"
            >
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  {currentGerundData.intermediate.explanation}
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 dark:text-white">Examples:</h4>
                  {currentGerundData.intermediate.examples.map((example, idx) => (
                    <div key={idx} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {getExampleText(example)}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {example.english}
                      </p>
                      {example.note && (
                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1 italic">
                          💡 {example.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Accordion>

            <Accordion 
              title={currentGerundData.advanced.title}
              level="advanced"
            >
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  {currentGerundData.advanced.explanation}
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 dark:text-white">Examples:</h4>
                  {currentGerundData.advanced.examples.map((example, idx) => (
                    <div key={idx} className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {getExampleText(example)}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {example.english}
                      </p>
                      {example.note && (
                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1 italic">
                          💡 {example.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              Example Sentences
              <Tooltip content="These examples show how to use the verb in different contexts">
                <span className="text-sm text-gray-500">ℹ️</span>
              </Tooltip>
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

          {/* Country Examples Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl shadow-lg p-8 mb-8 border-2 border-teal-200 dark:border-teal-700"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span>🌍</span> 
              <Tooltip content="Learn how to use country names correctly in sentences">
                Country Examples
              </Tooltip>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCountryExamples.slice(0, 6).map((example, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 + idx * 0.1 }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-teal-200 dark:border-teal-700"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🏳️</span>
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                      {example.country}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({example.english})
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-white font-medium mb-1">
                    {example.sentence}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {example.translation}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Gerund Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="bg-purple-50 dark:bg-purple-900/30 rounded-xl shadow-lg p-8 mb-8 border-2 border-purple-200 dark:border-purple-700"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span>💡</span> 
              <Tooltip content={`Quick tips for using ${currentGerundData.name}`}>
                {currentGerundData.name} Tips
              </Tooltip>
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              {currentGerundData.beginner.examples.slice(0, 3).map((example, idx) => (
                <p key={idx} className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                  <span>
                    <strong>{getExampleText(example)}</strong> → {example.english}
                    {example.verb && <span className="text-purple-600 dark:text-purple-400 ml-2 text-sm font-mono">({example.verb})</span>}
                  </span>
                </p>
              ))}
            </div>
          </motion.div>

          {/* Interactive Conjugation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="bg-gradient-to-r from-indigo-100 to-teal-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              <Tooltip content="Try conjugating different verbs to practice">
                Practice: Conjugate Another Verb
              </Tooltip>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Enter a {selectedLanguage.name} verb in <Tooltip content="The base form of the verb (e.g., to speak, to eat)">infinitive</Tooltip> form to see its <Tooltip content="Different forms of the verb for different persons and tenses">conjugations</Tooltip>:
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
