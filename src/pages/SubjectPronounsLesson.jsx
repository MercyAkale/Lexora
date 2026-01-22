import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

function SubjectPronounsLesson() {
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const pronouns = {
    singular: [
      { spanish: 'yo', english: 'I', example: 'Yo hablo español' },
      { spanish: 'tú', english: 'you (informal)', example: 'Tú hablas inglés' },
      { spanish: 'él', english: 'he', example: 'Él habla francés' },
      { spanish: 'ella', english: 'she', example: 'Ella habla italiano' },
      { spanish: 'usted', english: 'you (formal)', example: 'Usted habla alemán' },
    ],
    plural: [
      { spanish: 'nosotros', english: 'we (masculine)', example: 'Nosotros hablamos español' },
      { spanish: 'nosotras', english: 'we (feminine)', example: 'Nosotras hablamos español' },
      { spanish: 'vosotros', english: 'you all (informal, masculine)', example: 'Vosotros habláis español' },
      { spanish: 'vosotras', english: 'you all (informal, feminine)', example: 'Vosotras habláis español' },
      { spanish: 'ellos', english: 'they (masculine)', example: 'Ellos hablan español' },
      { spanish: 'ellas', english: 'they (feminine)', example: 'Ellas hablan español' },
      { spanish: 'ustedes', english: 'you all (formal)', example: 'Ustedes hablan español' },
    ],
  };

  const quizQuestions = [
    {
      question: 'What is "yo" in English?',
      options: ['I', 'you', 'he', 'we'],
      correct: 'I',
    },
    {
      question: 'Which pronoun means "she"?',
      options: ['él', 'ella', 'ellos', 'ellas'],
      correct: 'ella',
    },
    {
      question: 'What does "nosotros" mean?',
      options: ['we', 'they', 'you all', 'us'],
      correct: 'we',
    },
    {
      question: 'Which is the formal way to say "you"?',
      options: ['tú', 'vos', 'usted', 'ustedes'],
      correct: 'usted',
    },
    {
      question: 'What is "ellos" in English?',
      options: ['they (masculine)', 'they (feminine)', 'we', 'you all'],
      correct: 'they (masculine)',
    },
  ];

  const startQuiz = () => {
    setQuizMode(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/lessons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold"
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 via-green-500 to-blue-600 bg-clip-text text-transparent mb-4">
            Subject Pronouns in Spanish
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Subject pronouns tell us who is doing the action. Use them to start sentences like "Yo hablo español" (I speak Spanish).
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startQuiz}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white font-semibold rounded-lg shadow-md transition flex items-center gap-2"
            >
              <span>📝</span> Take the Quiz
            </motion.button>
          </div>

          {quizMode && !quizComplete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-2xl mx-auto"
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                    Score: {score}/{quizQuestions.length}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>
              </div>

              <div className="space-y-3 mb-6">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !showResult && handleAnswer(option)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-lg font-semibold text-left transition ${
                      showResult
                        ? option === quizQuestions[currentQuestion].correct
                          ? 'bg-green-500 text-white'
                          : option === selectedAnswer
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-teal-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextQuestion}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold"
                  >
                    {currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next Question →'}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ) : quizComplete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-2xl mx-auto text-center"
            >
              <div className="text-6xl mb-4">
                {score === quizQuestions.length ? '🎉' : score >= 3 ? '👍' : '📚'}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Quiz Complete!
              </h2>
              <p className="text-2xl text-teal-600 dark:text-teal-400 mb-6">
                Your Score: {score} out of {quizQuestions.length}
              </p>
              <div className="space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startQuiz}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold"
                >
                  Try Again
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuizMode(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-semibold"
                >
                  Review Pronouns
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Singular Pronouns */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <span>👤</span> Singular
                  </h2>
                  <div className="space-y-4">
                    {pronouns.singular.map((pronoun, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                            {pronoun.spanish}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {pronoun.english}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 italic">
                          "{pronoun.example}"
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Plural Pronouns */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <span>👥</span> Plural
                  </h2>
                  <div className="space-y-4">
                    {pronouns.plural.map((pronoun, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xl font-bold text-green-600 dark:text-green-400">
                            {pronoun.spanish}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {pronoun.english}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 italic">
                          "{pronoun.example}"
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Vos Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <span>💡</span> Special Note: "Vos"
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  The pronoun <strong className="text-yellow-700 dark:text-yellow-400">"vos"</strong> is used in some Latin American countries 
                  (especially Argentina, Uruguay, and parts of Central America) and means "tú" or "usted".
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Example:</p>
                  <p className="text-gray-800 dark:text-white">
                    <span className="font-semibold">tú haces</span> → <span className="font-semibold text-yellow-700 dark:text-yellow-400">vos hacés</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    (You do → You do [in vos regions])
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default SubjectPronounsLesson;
