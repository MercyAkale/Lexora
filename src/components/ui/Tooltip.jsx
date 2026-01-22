import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

function Tooltip({ children, content, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="cursor-help border-b border-dashed border-gray-400 dark:border-gray-500">
        {children}
      </span>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${positions[position]}`}
          >
            <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg px-3 py-2 shadow-lg max-w-xs">
              {content}
              <div className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45 ${
                position === 'top' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' :
                position === 'bottom' ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' :
                position === 'left' ? 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2' :
                'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2'
              }`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Tooltip;
