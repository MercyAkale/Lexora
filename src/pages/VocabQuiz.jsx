import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../stores/languageStore';

function VocabQuiz() {
  const { selectedLanguage } = useLanguageStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const quizData = {
    es: [
      {
        question: 'What does "hablando" mean?',
        options: ['Speaking', 'Eating', 'Walking', 'Running'],
        correct: 0,
        explanation: '"Hablando" is the gerund form of "hablar" (to speak), meaning "speaking".',
      },
      {
        question: 'Which word means "I live in Spain"?',
        options: ['Vivo en Francia', 'Vivo en España', 'Vivo en Italia', 'Vivo en Alemania'],
        correct: 1,
        explanation: '"España" is Spain in Spanish. The full sentence is "Yo vivo en España".',
      },
      {
        question: 'What is the gerund form of "comer" (to eat)?',
        options: ['Comiendo', 'Comido', 'Comer', 'Comes'],
        correct: 0,
        explanation: 'Gerunds in Spanish end in -iendo for -er verbs: comer → comiendo.',
      },
      {
        question: 'Which pronoun means "we"?',
        options: ['Yo', 'Tú', 'Nosotros', 'Ellos'],
        correct: 2,
        explanation: '"Nosotros" means "we" in Spanish.',
      },
      {
        question: 'What does "estoy aprendiendo" mean?',
        options: ['I learned', 'I am learning', 'I will learn', 'I learn'],
        correct: 1,
        explanation: '"Estoy aprendiendo" uses the present continuous tense with the gerund "aprendiendo".',
      },
    ],
    fr: [
      {
        question: 'What does "parlant" mean?',
        options: ['Speaking', 'Eating', 'Walking', 'Running'],
        correct: 0,
        explanation: '"Parlant" is the gerund form of "parler" (to speak).',
      },
      {
        question: 'Which word means "I live in France"?',
        options: ["J'habite en Espagne", "J'habite en France", "J'habite en Italie", "J'habite en Allemagne"],
        correct: 1,
        explanation: '"France" is France in French. The full sentence is "J\'habite en France".',
      },
    ],
  };

  const questions = quizData[selectedLanguage.code] || quizData.es;

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/grammar-tools" className="mb-6 inline-block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-orange-600 dark:text-yellow-400 hover:text-orange-700 dark:hover:text-yellow-300 font-semibold"
          >
            <span>←</span> Back to Grammar Tools
          </motion.button>
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2"
        >
          Vocabulary Quiz
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Test your {selectedLanguage.name} vocabulary knowledge
        </motion.p>

        {!quizComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Score: {score}/{questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: showResult ? 1 : 1.02 }}
                  whileTap={{ scale: showResult ? 1 : 0.98 }}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg text-left font-medium transition-all ${
                    showResult
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500 text-green-800 dark:text-green-200'
                        : index === selectedAnswer
                        ? 'bg-red-100 dark:bg-red-900 border-2 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-orange-900/30 text-gray-800 dark:text-white border-2 border-transparent hover:border-orange-300 dark:hover:border-orange-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        showResult && index === questions[currentQuestion].correct
                          ? 'bg-green-500 text-white'
                          : showResult && index === selectedAnswer
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showResult && index === questions[currentQuestion].correct && (
                      <span className="ml-auto text-green-600 dark:text-green-400 text-xl">✓</span>
                    )}
                    {showResult && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                      <span className="ml-auto text-red-600 dark:text-red-400 text-xl">✗</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-500"
              >
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Explanation:</span> {questions[currentQuestion].explanation}
                </p>
              </motion.div>
            )}

            {showResult && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextQuestion}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-6xl mb-4"
            >
              {score >= questions.length * 0.8 ? '🎉' : score >= questions.length * 0.5 ? '👍' : '💪'}
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Quiz Complete!</h2>
            <p className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              {score}/{questions.length}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {score >= questions.length * 0.8
                ? 'Excellent work! You have a great understanding of the vocabulary.'
                : score >= questions.length * 0.5
                ? 'Good job! Keep practicing to improve your score.'
                : 'Keep learning! Practice makes perfect.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default VocabQuiz;
