import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../stores/languageStore';

function AlphabetNumbers() {
  const { selectedLanguage } = useLanguageStore();
  const [playingSound, setPlayingSound] = useState(null);

  // Mock alphabet data for different languages
  const alphabetData = {
    es: [
      { letter: 'A', pronunciation: 'ah' },
      { letter: 'B', pronunciation: 'beh' },
      { letter: 'C', pronunciation: 'seh' },
      { letter: 'D', pronunciation: 'deh' },
      { letter: 'E', pronunciation: 'eh' },
      { letter: 'F', pronunciation: 'efeh' },
      { letter: 'G', pronunciation: 'heh' },
      { letter: 'H', pronunciation: 'acheh' },
      { letter: 'I', pronunciation: 'ee' },
      { letter: 'J', pronunciation: 'hotah' },
      { letter: 'K', pronunciation: 'kah' },
      { letter: 'L', pronunciation: 'eleh' },
      { letter: 'M', pronunciation: 'emeh' },
      { letter: 'N', pronunciation: 'eneh' },
      { letter: 'Ñ', pronunciation: 'enyeh' },
      { letter: 'O', pronunciation: 'oh' },
      { letter: 'P', pronunciation: 'peh' },
      { letter: 'Q', pronunciation: 'koo' },
      { letter: 'R', pronunciation: 'ereh' },
      { letter: 'S', pronunciation: 'eseh' },
      { letter: 'T', pronunciation: 'teh' },
      { letter: 'U', pronunciation: 'oo' },
      { letter: 'V', pronunciation: 'veh' },
      { letter: 'W', pronunciation: 'doble veh' },
      { letter: 'X', pronunciation: 'ekis' },
      { letter: 'Y', pronunciation: 'ye' },
      { letter: 'Z', pronunciation: 'seta' },
    ],
    fr: [
      { letter: 'A', pronunciation: 'ah' },
      { letter: 'B', pronunciation: 'beh' },
      { letter: 'C', pronunciation: 'seh' },
      { letter: 'D', pronunciation: 'deh' },
      { letter: 'E', pronunciation: 'euh' },
      { letter: 'F', pronunciation: 'eff' },
      { letter: 'G', pronunciation: 'jheh' },
      { letter: 'H', pronunciation: 'ash' },
      { letter: 'I', pronunciation: 'ee' },
      { letter: 'J', pronunciation: 'jhee' },
    ],
  };

  const numbersData = {
    es: [
      { num: 1, word: 'uno' },
      { num: 2, word: 'dos' },
      { num: 3, word: 'tres' },
      { num: 4, word: 'cuatro' },
      { num: 5, word: 'cinco' },
      { num: 6, word: 'seis' },
      { num: 7, word: 'siete' },
      { num: 8, word: 'ocho' },
      { num: 9, word: 'nueve' },
      { num: 10, word: 'diez' },
      { num: 11, word: 'once' },
      { num: 12, word: 'doce' },
      { num: 13, word: 'trece' },
      { num: 14, word: 'catorce' },
      { num: 15, word: 'quince' },
      { num: 16, word: 'dieciséis' },
      { num: 17, word: 'diecisiete' },
      { num: 18, word: 'dieciocho' },
      { num: 19, word: 'diecinueve' },
      { num: 20, word: 'veinte' },
      { num: 30, word: 'treinta' },
      { num: 40, word: 'cuarenta' },
      { num: 50, word: 'cincuenta' },
      { num: 60, word: 'sesenta' },
      { num: 70, word: 'setenta' },
      { num: 80, word: 'ochenta' },
      { num: 90, word: 'noventa' },
      { num: 100, word: 'cien' },
      { num: 200, word: 'doscientos' },
      { num: 1000, word: 'mil' },
    ],
    fr: [
      { num: 1, word: 'un' },
      { num: 2, word: 'deux' },
      { num: 3, word: 'trois' },
      { num: 4, word: 'quatre' },
      { num: 5, word: 'cinq' },
      { num: 6, word: 'six' },
      { num: 7, word: 'sept' },
      { num: 8, word: 'huit' },
      { num: 9, word: 'neuf' },
      { num: 10, word: 'dix' },
    ],
  };

  const alphabet = alphabetData[selectedLanguage.code] || alphabetData.es;
  const numbers = numbersData[selectedLanguage.code] || numbersData.es;

  const speak = (text, index) => {
    if ('speechSynthesis' in window) {
      setPlayingSound(index);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage.code === 'es' ? 'es-ES' : 
                       selectedLanguage.code === 'fr' ? 'fr-FR' : 'en-US';
      utterance.onend = () => setPlayingSound(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2"
        >
          Basics: Alphabet & Numbers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Learn the alphabet and numbers in {selectedLanguage.name}
        </motion.p>

        {/* Alphabet Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <span>🔤</span> Alphabet
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {alphabet.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.02 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => speak(item.letter, `alpha-${index}`)}
                className={`p-4 rounded-lg shadow-md transition-all ${
                  playingSound === `alpha-${index}`
                    ? 'bg-gradient-to-br from-teal-500 to-blue-500 text-white'
                    : 'bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 hover:from-teal-200 hover:to-blue-200 dark:hover:from-teal-800 dark:hover:to-blue-800'
                }`}
              >
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                  {item.letter}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {item.pronunciation}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Numbers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <span>🔢</span> Numbers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {numbers.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.02 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => speak(item.word, `num-${index}`)}
                className={`p-4 rounded-lg shadow-md transition-all ${
                  playingSound === `num-${index}`
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                    : 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-800 dark:hover:to-cyan-800'
                }`}
              >
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  {item.num}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {item.word}
                </div>
              </motion.button>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-2 border-blue-200 dark:border-blue-700"
          >
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <span className="font-bold">💡 Tip:</span> Click on any letter or number to hear its pronunciation using text-to-speech.
              Example: "Uno" is 1 in {selectedLanguage.name}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AlphabetNumbers;
