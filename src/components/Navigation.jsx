import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';

function Navigation() {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/lessons', label: 'Lessons', icon: '📚' },
    { path: '/ai-tutor', label: 'AI Tutor', icon: '🤖' },
    { path: '/grammar-tools', label: 'Grammar', icon: '✍️' },
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
            <div className="flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              ))}
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
