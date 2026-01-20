import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useLanguageStore, languages } from '../stores/languageStore';

function Navigation() {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { selectedLanguage, setLanguage } = useLanguageStore();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/lessons', label: 'Lessons', icon: '📚' },
    { path: '/ai-tutor', label: 'AI Tutor', icon: '🤖' },
    { path: '/grammar-tools', label: 'Grammar', icon: '✍️' },
    { path: '/basics/alphabet-numbers', label: 'Basics', icon: '🔤' },
    { path: '/roleplay', label: 'Role Play', icon: '🎭' },
    { path: '/daily-conversation', label: 'Daily', icon: '💬' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-2xl">📖</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Lexora
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-1 overflow-x-auto">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  <span className="hidden lg:inline text-sm">{item.label}</span>
                </Link>
              ))}
            </div>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="ml-2 p-2 px-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
                aria-label="Select language"
              >
                <span className="text-lg">{selectedLanguage.flag}</span>
                <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                  {selectedLanguage.name}
                </span>
              </button>
              
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-indigo-50 dark:hover:bg-gray-700 transition flex items-center gap-3 ${
                        selectedLanguage.code === lang.code ? 'bg-indigo-100 dark:bg-gray-700' : ''
                      } ${lang === languages[0] ? 'rounded-t-lg' : ''} ${
                        lang === languages[languages.length - 1] ? 'rounded-b-lg' : ''
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
