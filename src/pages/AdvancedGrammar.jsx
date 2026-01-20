import { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function AdvancedGrammar() {
  const [completed, setCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const grammarRule = {
    title: 'Subjunctive Mood in Spanish',
    description: 'The subjunctive mood is used to express doubt, uncertainty, wishes, emotions, and hypothetical situations. It is often triggered by certain phrases and conjunctions.',
    examples: [
      { spanish: 'Es importante que estudies.', english: "It's important that you study." },
      { spanish: 'Espero que tengas un buen día.', english: 'I hope you have a good day.' },
      { spanish: 'Dudo que él venga.', english: 'I doubt that he will come.' },
    ],
    triggers: [
      'Es importante que...',
      'Espero que...',
      'Dudo que...',
      'Es necesario que...',
      'Quiero que...',
    ],
  };

  const quizQuestions = [
    {
      id: 1,
      question: 'Es necesario que tú ___ más agua.',
      options: ['bebes', 'bebas', 'beber', 'bebiendo'],
      correct: 'bebas',
      explanation: 'After "es necesario que," we use the subjunctive form "bebas"',
    },
    {
      id: 2,
      question: 'Espero que ellos ___ a tiempo.',
      options: ['llegan', 'lleguen', 'llegar', 'llegando'],
      correct: 'lleguen',
      explanation: 'After "espero que," we use the subjunctive form "lleguen"',
    },
    {
      id: 3,
      question: 'Dudo que nosotros ___ ir al concierto.',
      options: ['podemos', 'podamos', 'poder', 'pudiendo'],
      correct: 'podamos',
      explanation: 'After "dudo que," we use the subjunctive form "podamos"',
    },
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const getScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) correct++;
    });
    return correct;
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
              Advanced Grammar Lesson
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

          {/* Grammar Rule Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {grammarRule.title}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {grammarRule.description}
            </p>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              Common Triggers:
            </h3>
            <ul className="grid md:grid-cols-2 gap-2 mb-6">
              {grammarRule.triggers.map((trigger, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-indigo-600 dark:text-teal-400">▸</span>
                  {trigger}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              Examples:
            </h3>
            <div className="space-y-4">
              {grammarRule.examples.map((example, index) => (
                <div key={index} className="bg-indigo-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-lg font-semibold text-indigo-600 dark:text-teal-400 mb-1">
                    {example.spanish}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {example.english}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quiz Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Practice Quiz
            </h2>

            <div className="space-y-6">
              {quizQuestions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                  <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    {index + 1}. {question.question}
                  </p>
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswerSelect(question.id, option)}
                        className={`w-full text-left px-4 py-3 rounded-lg border-2 transition ${
                          selectedAnswers[question.id] === option
                            ? showResults && option === question.correct
                              ? 'border-green-500 bg-green-50 dark:bg-green-900'
                              : showResults && option !== question.correct
                              ? 'border-red-500 bg-red-50 dark:bg-red-900'
                              : 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900'
                            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {showResults && (
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      💡 {question.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {!showResults ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length !== quizQuestions.length}
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${
                  Object.keys(selectedAnswers).length === quizQuestions.length
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Quiz
              </motion.button>
            ) : (
              <div className="mt-6 bg-indigo-100 dark:bg-indigo-900 rounded-lg p-6 text-center">
                <p className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">
                  Your Score: {getScore()} / {quizQuestions.length}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {getScore() === quizQuestions.length ? '🎉 Perfect! Great job!' : '👍 Good effort! Keep practicing!'}
                </p>
              </div>
            )}
          </motion.div>

          <div className="bg-indigo-100 dark:bg-indigo-900 rounded-xl p-6">
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
              Progress: 0%
            </h3>
            <div className="w-full bg-indigo-200 dark:bg-indigo-700 rounded-full h-3">
              <div className="bg-indigo-600 dark:bg-teal-500 h-3 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdvancedGrammar;
