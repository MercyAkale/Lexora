import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function CommonWordsLesson() {
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [practiceWords, setPracticeWords] = useState([]);

  // 100 Most Common Spanish Words
  const commonWords = [
    { num: 1, spanish: 'el/la', english: 'the' },
    { num: 2, spanish: 'de', english: 'of' },
    { num: 3, spanish: 'que', english: 'that/what' },
    { num: 4, spanish: 'y', english: 'and' },
    { num: 5, spanish: 'a', english: 'to' },
    { num: 6, spanish: 'en', english: 'in/on' },
    { num: 7, spanish: 'un', english: 'a/an' },
    { num: 8, spanish: 'ser', english: 'to be' },
    { num: 9, spanish: 'se', english: 'himself/herself' },
    { num: 10, spanish: 'no', english: 'no/not' },
    { num: 11, spanish: 'haber', english: 'to have' },
    { num: 12, spanish: 'por', english: 'for/by' },
    { num: 13, spanish: 'con', english: 'with' },
    { num: 14, spanish: 'su', english: 'his/her/their' },
    { num: 15, spanish: 'para', english: 'for/to' },
    { num: 16, spanish: 'como', english: 'like/as' },
    { num: 17, spanish: 'estar', english: 'to be' },
    { num: 18, spanish: 'tener', english: 'to have' },
    { num: 19, spanish: 'le', english: 'him/her' },
    { num: 20, spanish: 'lo', english: 'it/him' },
    { num: 21, spanish: 'todo', english: 'all/everything' },
    { num: 22, spanish: 'pero', english: 'but' },
    { num: 23, spanish: 'más', english: 'more' },
    { num: 24, spanish: 'hacer', english: 'to do/make' },
    { num: 25, spanish: 'o', english: 'or' },
    { num: 26, spanish: 'poder', english: 'can/to be able' },
    { num: 27, spanish: 'decir', english: 'to say/tell' },
    { num: 28, spanish: 'este', english: 'this' },
    { num: 29, spanish: 'ir', english: 'to go' },
    { num: 30, spanish: 'otro', english: 'other/another' },
    { num: 31, spanish: 'ese', english: 'that' },
    { num: 32, spanish: 'la', english: 'the (fem)' },
    { num: 33, spanish: 'si', english: 'if' },
    { num: 34, spanish: 'me', english: 'me' },
    { num: 35, spanish: 'ya', english: 'already/now' },
    { num: 36, spanish: 'ver', english: 'to see' },
    { num: 37, spanish: 'porque', english: 'because' },
    { num: 38, spanish: 'dar', english: 'to give' },
    { num: 39, spanish: 'cuando', english: 'when' },
    { num: 40, spanish: 'él', english: 'he' },
    { num: 41, spanish: 'muy', english: 'very' },
    { num: 42, spanish: 'sin', english: 'without' },
    { num: 43, spanish: 'vez', english: 'time' },
    { num: 44, spanish: 'mucho', english: 'much/many' },
    { num: 45, spanish: 'saber', english: 'to know' },
    { num: 46, spanish: 'qué', english: 'what' },
    { num: 47, spanish: 'sobre', english: 'about/on' },
    { num: 48, spanish: 'mi', english: 'my' },
    { num: 49, spanish: 'alguno', english: 'some' },
    { num: 50, spanish: 'mismo', english: 'same' },
    { num: 51, spanish: 'yo', english: 'I' },
    { num: 52, spanish: 'también', english: 'also/too' },
    { num: 53, spanish: 'hasta', english: 'until/even' },
    { num: 54, spanish: 'año', english: 'year' },
    { num: 55, spanish: 'dos', english: 'two' },
    { num: 56, spanish: 'querer', english: 'to want' },
    { num: 57, spanish: 'entre', english: 'between' },
    { num: 58, spanish: 'así', english: 'thus/like this' },
    { num: 59, spanish: 'primero', english: 'first' },
    { num: 60, spanish: 'desde', english: 'from/since' },
    { num: 61, spanish: 'grande', english: 'big/great' },
    { num: 62, spanish: 'eso', english: 'that' },
    { num: 63, spanish: 'ni', english: 'neither/nor' },
    { num: 64, spanish: 'nos', english: 'us' },
    { num: 65, spanish: 'llegar', english: 'to arrive' },
    { num: 66, spanish: 'pasar', english: 'to pass/happen' },
    { num: 67, spanish: 'tiempo', english: 'time/weather' },
    { num: 68, spanish: 'ella', english: 'she' },
    { num: 69, spanish: 'sí', english: 'yes' },
    { num: 70, spanish: 'día', english: 'day' },
    { num: 71, spanish: 'uno', english: 'one' },
    { num: 72, spanish: 'bien', english: 'well/good' },
    { num: 73, spanish: 'poco', english: 'little/few' },
    { num: 74, spanish: 'deber', english: 'must/should' },
    { num: 75, spanish: 'entonces', english: 'then' },
    { num: 76, spanish: 'poner', english: 'to put/place' },
    { num: 77, spanish: 'cosa', english: 'thing' },
    { num: 78, spanish: 'tanto', english: 'so much' },
    { num: 79, spanish: 'hombre', english: 'man' },
    { num: 80, spanish: 'parecer', english: 'to seem' },
    { num: 81, spanish: 'nuestro', english: 'our' },
    { num: 82, spanish: 'tan', english: 'so/such' },
    { num: 83, spanish: 'donde', english: 'where' },
    { num: 84, spanish: 'ahora', english: 'now' },
    { num: 85, spanish: 'parte', english: 'part' },
    { num: 86, spanish: 'después', english: 'after' },
    { num: 87, spanish: 'vida', english: 'life' },
    { num: 88, spanish: 'quedar', english: 'to stay/remain' },
    { num: 89, spanish: 'siempre', english: 'always' },
    { num: 90, spanish: 'creer', english: 'to believe' },
    { num: 91, spanish: 'hablar', english: 'to speak' },
    { num: 92, spanish: 'llevar', english: 'to carry/wear' },
    { num: 93, spanish: 'dejar', english: 'to leave/let' },
    { num: 94, spanish: 'nada', english: 'nothing' },
    { num: 95, spanish: 'cada', english: 'each/every' },
    { num: 96, spanish: 'seguir', english: 'to follow' },
    { num: 97, spanish: 'menos', english: 'less' },
    { num: 98, spanish: 'nuevo', english: 'new' },
    { num: 99, spanish: 'encontrar', english: 'to find/meet' },
    { num: 100, spanish: 'algo', english: 'something' },
  ];

  const startPractice = () => {
    // Select 5 random words
    const shuffled = [...commonWords].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);
    setPracticeWords(selected);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setPracticeMode(true);
  };

  const nextCard = () => {
    if (currentCardIndex < practiceWords.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setPracticeMode(false);
    }
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-4">
            100 Most Common Words in Spanish
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              These are the 100 words you will hear most often in Spanish. Learn them to understand and speak faster!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startPractice}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition flex items-center gap-2"
            >
              <span>🎴</span> Practice with Flashcards
            </motion.button>
          </div>

          {practiceMode ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-2xl mx-auto"
            >
              <div className="text-center mb-6">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Card {currentCardIndex + 1} of {practiceWords.length}
                </span>
              </div>

              <motion.div
                className="relative h-64 cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
                whileHover={{ scale: 1.02 }}
              >
                <AnimatePresence mode="wait">
                  {!isFlipped ? (
                    <motion.div
                      key="front"
                      initial={{ rotateY: 0 }}
                      exit={{ rotateY: 90 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-xl flex items-center justify-center"
                    >
                      <div className="text-center text-white">
                        <div className="text-5xl font-bold mb-4">
                          {practiceWords[currentCardIndex]?.spanish}
                        </div>
                        <div className="text-sm opacity-75">Click to reveal translation</div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ rotateY: -90 }}
                      animate={{ rotateY: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl shadow-xl flex items-center justify-center"
                    >
                      <div className="text-center text-white">
                        <div className="text-5xl font-bold mb-4">
                          {practiceWords[currentCardIndex]?.english}
                        </div>
                        <div className="text-sm opacity-75">Click to see Spanish</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="flex justify-between items-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={previousCard}
                  disabled={currentCardIndex === 0}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextCard}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
                >
                  {currentCardIndex === practiceWords.length - 1 ? 'Finish' : 'Next →'}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Complete Word List</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-4">
                {commonWords.map((word) => (
                  <motion.div
                    key={word.num}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: word.num * 0.01 }}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-600 transition"
                  >
                    <span className="text-sm font-bold text-indigo-600 dark:text-teal-400 w-8">
                      {word.num}.
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 dark:text-white">
                        {word.spanish}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {word.english}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default CommonWordsLesson;
