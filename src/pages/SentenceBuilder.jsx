import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function SentenceBuilder() {
  const [selectedWords, setSelectedWords] = useState([]);

  const sentenceStarters = [
    { spanish: 'Me gustaría...', english: 'I would like to' },
    { spanish: 'Ayer yo...', english: 'Yesterday I' },
    { spanish: 'Si yo tuviera...', english: 'If I had' },
    { spanish: 'Aunque es...', english: 'Although it is' },
    { spanish: 'Cuando llego...', english: 'When I arrive' },
    { spanish: 'Espero que...', english: 'I hope that' },
  ];

  const wordBlocks = {
    subjects: [
      { spanish: 'yo', english: 'I' },
      { spanish: 'tú', english: 'you' },
      { spanish: 'él/ella', english: 'he/she' },
      { spanish: 'nosotros', english: 'we' },
      { spanish: 'ellos/ellas', english: 'they' },
    ],
    verbs: [
      { spanish: 'hablar', english: 'to speak' },
      { spanish: 'comer', english: 'to eat' },
      { spanish: 'vivir', english: 'to live' },
      { spanish: 'ir', english: 'to go' },
      { spanish: 'tener', english: 'to have' },
      { spanish: 'querer', english: 'to want' },
      { spanish: 'poder', english: 'can' },
      { spanish: 'hacer', english: 'to do/make' },
    ],
    objects: [
      { spanish: 'a la playa', english: 'to the beach' },
      { spanish: 'con amigos', english: 'with friends' },
      { spanish: 'un libro', english: 'a book' },
      { spanish: 'la comida', english: 'the food' },
      { spanish: 'español', english: 'Spanish' },
      { spanish: 'música', english: 'music' },
      { spanish: 'en casa', english: 'at home' },
      { spanish: 'el parque', english: 'the park' },
    ],
    conjunctions: [
      { spanish: 'porque', english: 'because' },
      { spanish: 'pero', english: 'but' },
      { spanish: 'y', english: 'and' },
      { spanish: 'aunque', english: 'although' },
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
    const starter = sentenceStarters[Math.floor(Math.random() * sentenceStarters.length)];
    const subject = wordBlocks.subjects[Math.floor(Math.random() * wordBlocks.subjects.length)];
    const verb = wordBlocks.verbs[Math.floor(Math.random() * wordBlocks.verbs.length)];
    const object = wordBlocks.objects[Math.floor(Math.random() * wordBlocks.objects.length)];
    const conjunction = wordBlocks.conjunctions[Math.floor(Math.random() * wordBlocks.conjunctions.length)];
    
    setSelectedWords([starter, subject, verb, object, conjunction]);
  };

  const saveSentence = () => {
    if (selectedWords.length > 0) {
      const spanish = selectedWords.map(w => w.spanish).join(' ');
      const english = selectedWords.map(w => w.english).join(' ');
      console.log('Saving sentence:', { spanish, english });
      alert(`Sentence saved!\n\nSpanish: ${spanish}\nEnglish: ${english}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link to="/grammar-tools">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-indigo-600 dark:text-teal-400 hover:text-indigo-700 dark:hover:text-teal-300 font-semibold mb-4"
            >
              <span>←</span> Back to Grammar Tools
            </motion.button>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-2">
            Sentence Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Build perfect Spanish sentences with interactive word blocks
          </p>
        </motion.div>

        {/* Sentence Starters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span>🚀</span> Sentence Starters
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sentenceStarters.map((starter, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addWord(starter)}
                className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg hover:shadow-md transition text-left border-2 border-transparent hover:border-purple-300 dark:hover:border-pink-700"
              >
                <div className="font-bold text-gray-800 dark:text-white text-sm">{starter.spanish}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{starter.english}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sentence Preview Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-6 border-2 border-indigo-200 dark:border-teal-700"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span>✨</span> Your Sentence Preview
          </h2>
          
          {/* Spanish Sentence */}
          <div className="min-h-[80px] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-lg p-4 mb-4 flex flex-wrap gap-2 items-center border-2 border-dashed border-indigo-300 dark:border-teal-600">
            {selectedWords.length === 0 ? (
              <span className="text-gray-400 dark:text-gray-500 italic">Click word blocks below to build your sentence...</span>
            ) : (
              selectedWords.map((word, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 10 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="bg-white dark:bg-gray-600 px-4 py-2 rounded-lg shadow-md cursor-pointer font-bold text-indigo-700 dark:text-teal-300 flex items-center gap-2 border-2 border-indigo-300 dark:border-teal-500"
                  onClick={() => removeWord(index)}
                >
                  {word.spanish}
                  <span className="text-red-500 text-xs hover:scale-125 transition">✕</span>
                </motion.div>
              ))
            )}
          </div>

          {/* English Translation */}
          {selectedWords.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-700 rounded-lg p-4 mb-4 border-2 border-purple-200 dark:border-pink-700"
            >
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-semibold flex items-center gap-2">
                <span>🌐</span> English Translation:
              </div>
              <div className="text-lg text-gray-800 dark:text-white font-medium">
                {selectedWords.map(w => w.english).join(' ')}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={generateRandomSentence}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>🎲</span> Generate Random Sentence
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={saveSentence}
              disabled={selectedWords.length === 0}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>💾</span> Save Sentence
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={clearSentence}
              disabled={selectedWords.length === 0}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>🗑️</span> Clear
            </motion.button>
          </div>
        </motion.div>

        {/* Word Blocks Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {Object.entries(wordBlocks).map(([category, words], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + categoryIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 capitalize flex items-center gap-2">
                {category === 'subjects' && '👤'}
                {category === 'verbs' && '⚡'}
                {category === 'objects' && '🎯'}
                {category === 'conjunctions' && '🔗'}
                <span>{category}</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {words.map((word, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + categoryIndex * 0.1 + index * 0.02 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => addWord(word)}
                    className="px-4 py-3 bg-gradient-to-br from-indigo-100 to-teal-100 dark:from-indigo-900 dark:to-teal-900 text-gray-800 dark:text-white rounded-lg font-medium hover:shadow-md transition border-2 border-transparent hover:border-indigo-300 dark:hover:border-teal-500"
                  >
                    <div className="font-bold text-sm">{word.spanish}</div>
                    <div className="text-xs opacity-70">{word.english}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default SentenceBuilder;
