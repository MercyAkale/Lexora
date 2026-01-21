import { Component } from 'react';
import { logError } from '../utils/errorLogger';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    logError(error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-100 to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950 text-gray-900 dark:text-gray-50 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-3xl shadow-2xl border border-indigo-100/60 dark:border-indigo-900/40 p-10 space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200 text-2xl">
                ⚡
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-300 font-semibold">Something went wrong</p>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">We hit a glitch</h1>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The page had an unexpected error. Our team is on it. You can try again or head back home while we keep your progress safe.
            </p>

            {error && (
              <pre className="text-sm bg-gray-900/5 dark:bg-gray-800/80 text-red-600 dark:text-red-300 rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-700">
                {error.toString()}
              </pre>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition"
              >
                Refresh page
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="px-4 py-2.5 rounded-xl bg-gray-900/5 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold border border-gray-200 dark:border-gray-600 hover:border-indigo-300 hover:text-indigo-700 dark:hover:border-indigo-500 dark:hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition"
              >
                Try again
              </button>
              <a
                href="/"
                className="px-4 py-2.5 rounded-xl text-indigo-700 dark:text-indigo-200 font-semibold hover:text-indigo-500 dark:hover:text-white underline decoration-indigo-300 dark:decoration-indigo-600 decoration-2"
              >
                Back to home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
