import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function SentenceBuilder() {
  const [selectedWords, setSelectedWords] = useState([]);
  const [savedSentences, setSavedSentences] = useState([]);

  const sentenceStarters = [
    { spanish: 'Me gustaría...', english: 'I would like to...' },
    { spanish: 'Ayer fui a...', english: 'Yesterday I went to...' },
    { spanish: 'Si tuviera...', english: 'If I had...' },
    { spanish: 'Aunque era...', english: 'Although it was...' },
    { spanish: 'Cuando llego...', english: 'When I arrive...' },
    { spanish: 'Espero que...', english: 'I hope that...' },
  ];

  const wordBlocks = {
    subjects: [
      { spanish: 'yo', english: 'I' },
      { spanish: 'tú', english: 'you' },
      { spanish: 'él', english: 'he' },
      { spanish: 'ella', english: 'she' },
      { spanish: 'nosotros', english: 'we' },
      { spanish: 'ellos', english: 'they' },
    ],
    verbs: [
      { spanish: 'como', english: 'eat' },
      { spanish: 'vivo', english: 'live' },
      { spanish: 'hablo', english: 'speak' },
      { spanish: 'voy', english: 'go' },
      { spanish: 'tengo', english: 'have' },
      { spanish: 'quiero', english: 'want' },
      { spanish: 'puedo', english: 'can' },
      { spanish: 'soy', english: 'am/is' },
    ],
    objects: [
      { spanish: 'la casa', english: 'the house' },
      { spanish: 'el libro', english: 'the book' },
      { spanish: 'comida', english: 'food' },
      { spanish: 'español', english: 'Spanish' },
      { spanish: 'música', english: 'music' },
      { spanish: 'amigos', english: 'friends' },
    ],
    adjectives: [
      { spanish: 'grande', english: 'big' },
      { spanish: 'pequeño', english: 'small' },
      { spanish: 'bueno', english: 'good' },
      { spanish: 'feliz', english: 'happy' },
      { spanish: 'rápido', english: 'fast' },
      { spanish: 'hermoso', english: 'beautiful' },
    ],
    time: [
      { spanish: 'hoy', english: 'today' },
      { spanish: 'mañana', english: 'tomorrow' },
      { spanish: 'ayer', english: 'yesterday' },
      { spanish: 'ahora', english: 'now' },
      { spanish: 'siempre', english: 'always' },
      { spanish: 'nunca', english: 'never' },
    ],
    conjunctions: [
      { spanish: 'y', english: 'and' },
      { spanish: 'pero', english: 'but' },
      { spanish: 'porque', english: 'because' },
      { spanish: 'cuando', english: 'when' },
      { spanish: 'si', english: 'if' },
      { spanish: 'que', english: 'that' },
    ],
  };

  const addWord = (word) => {
    setSelectedWords([...selectedWords, word]);
  };

  const removeWord = (index) => {
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };

  const clearSentence = () => {
    setSelectedWords([]);
  };

  const generateRandomSentence = () => {
    const subject = wordBlocks.subjects[Math.floor(Math.random() * wordBlocks.subjects.length)];
    const verb = wordBlocks.verbs[Math.floor(Math.random() * wordBlocks.verbs.length)];
    const object = wordBlocks.objects[Math.floor(Math.random() * wordBlocks.objects.length)];
    const time = wordBlocks.time[Math.floor(Math.random() * wordBlocks.time.length)];
    
    setSelectedWords([subject, verb, object, time]);
  };

  const saveSentence = () => {
    if (selectedWords.length > 0) {
      const spanish = selectedWords.map(w => w.spanish).join(' ');
      const english = selectedWords.map(w => w.english).join(' ');
      setSavedSentences([...savedSentences, { spanish, english, timestamp: Date.now() }]);
      setSelectedWords([]);
    }
  };

  const applyStarter = (starter) => {
    setSelectedWords([starter]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/grammar-tools" className="text-indigo-600 dark:text-teal-400 hover:underline mb-2 inline-block">
            ← Back to Grammar Tools
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-2">
            Sentence Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Build perfect sentences with interactive word blocks
          </p>
        </motion.div>

        {/* Sentence Starters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Sentence Starters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sentenceStarters.map((starter, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => applyStarter(starter)}
                className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg hover:shadow-md transition text-left"
              >
                <div className="font-bold text-gray-800 dark:text-white">{starter.spanish}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{starter.english}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sentence Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Your Sentence</h2>
          
          {/* Spanish */}
          <div className="min-h-[60px] bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-gray-700 dark:to-gray-700 rounded-lg p-4 mb-4 flex flex-wrap gap-2 items-center">
            {selectedWords.length === 0 ? (
              <span className="text-gray-400 dark:text-gray-500">Click words below to build your sentence...</span>
            ) : (
              selectedWords.map((word, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-white dark:bg-gray-600 px-4 py-2 rounded-lg shadow-md cursor-pointer font-bold text-indigo-600 dark:text-teal-400 flex items-center gap-2"
                  onClick={() => removeWord(index)}
                >
                  {word.spanish}
                  <span className="text-red-500 text-xs">✕</span>
                </motion.div>
              ))
            )}
          </div>

          {/* English Translation */}
          {selectedWords.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4"
            >
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Translation:</div>
              <div className="text-lg text-gray-800 dark:text-white">
                {selectedWords.map(w => w.english).join(' ')}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateRandomSentence}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
            >
              🎲 Random Sentence
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveSentence}
              disabled={selectedWords.length === 0}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              💾 Save Sentence
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearSentence}
              disabled={selectedWords.length === 0}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🗑️ Clear
            </motion.button>
          </div>
        </motion.div>

        {/* Word Blocks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {Object.entries(wordBlocks).map(([category, words]) => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 capitalize">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {words.map((word, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addWord(word)}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-teal-100 dark:from-indigo-900 dark:to-teal-900 text-gray-800 dark:text-white rounded-lg font-medium hover:shadow-md transition"
                  >
                    <div className="font-bold">{word.spanish}</div>
                    <div className="text-xs opacity-70">{word.english}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Saved Sentences */}
        {savedSentences.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Saved Sentences ({savedSentences.length})
            </h2>
            <div className="space-y-3">
              {savedSentences.slice(-5).reverse().map((sentence, index) => (
                <motion.div
                  key={sentence.timestamp}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-gray-700 dark:to-gray-700 rounded-lg"
                >
                  <div className="font-bold text-gray-800 dark:text-white mb-1">{sentence.spanish}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{sentence.english}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SentenceBuilder;
