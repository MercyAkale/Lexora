import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Accordion({ title, children, level, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const levelColors = {
    beginner: 'from-green-500 to-emerald-500',
    intermediate: 'from-blue-500 to-cyan-500',
    advanced: 'from-purple-500 to-pink-500',
  };

  const levelBgColors = {
    beginner: 'bg-green-50 dark:bg-green-900/20',
    intermediate: 'bg-blue-50 dark:bg-blue-900/20',
    advanced: 'bg-purple-50 dark:bg-purple-900/20',
  };

  return (
    <div className={`rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${levelBgColors[level] || 'bg-white dark:bg-gray-800'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {level && (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${levelColors[level]} text-white`}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
          )}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-left">
            {title}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-600 dark:text-gray-400"
        >
          ▼
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Accordion;
