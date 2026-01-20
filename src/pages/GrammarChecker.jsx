import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../stores/languageStore';

function GrammarChecker() {
  const { selectedLanguage } = useLanguageStore();
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);

  const checkGrammar = () => {
    if (!inputText.trim()) {
      return;
    }

    // Mock grammar checking logic
    const lowerText = inputText.toLowerCase();
    let feedback = [];

    if (lowerText.includes('i go') && !lowerText.includes('i am going')) {
      feedback.push({
        type: 'suggestion',
        message: 'Consider using gerund form: "I am going" instead of "I go" for present continuous.',
      });
    }

    if (lowerText.includes('he go') || lowerText.includes('she go')) {
      feedback.push({
        type: 'error',
        message: 'Subject-verb agreement error: Use "he/she goes" instead of "he/she go".',
      });
    }

    if (!lowerText.match(/[.!?]$/)) {
      feedback.push({
        type: 'warning',
        message: 'Consider adding punctuation at the end of your sentence.',
      });
    }

    if (feedback.length === 0) {
      feedback.push({
        type: 'success',
        message: 'Looks good! Your sentence appears grammatically correct.',
      });
    }

    setResult({ feedback, text: inputText });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/grammar-tools" className="mb-6 inline-block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-green-600 dark:text-teal-400 hover:text-green-700 dark:hover:text-teal-300 font-semibold"
          >
            <span>←</span> Back to Grammar Tools
          </motion.button>
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2"
        >
          Grammar Checker
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Check your {selectedLanguage.name} sentences for grammatical errors
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        >
          <label className="block text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Enter your sentence:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your sentence here... (e.g., 'I am speaking Spanish')"
            className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 h-40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={checkGrammar}
            disabled={!inputText.trim()}
            className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Grammar
          </motion.button>
        </motion.div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span>📝</span> Results
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p className="text-gray-700 dark:text-gray-300 italic">"{result.text}"</p>
            </div>
            <div className="space-y-3">
              {result.feedback.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-4 rounded-lg border-l-4 ${
                    item.type === 'success'
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-500'
                      : item.type === 'error'
                      ? 'bg-red-50 dark:bg-red-900/30 border-red-500'
                      : item.type === 'warning'
                      ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-500'
                      : 'bg-blue-50 dark:bg-blue-900/30 border-blue-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">
                      {item.type === 'success' ? '✓' : item.type === 'error' ? '✗' : item.type === 'warning' ? '⚠' : '💡'}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">{item.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-6 border-2 border-emerald-200 dark:border-emerald-700"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <span>💡</span> Grammar Tips
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 mt-1">•</span>
              <span>Use gerunds (-ing forms) for ongoing actions: "I am speaking" (Estoy hablando)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 mt-1">•</span>
              <span>Check subject-verb agreement: "He goes" not "He go"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 mt-1">•</span>
              <span>Always end sentences with proper punctuation</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default GrammarChecker;
