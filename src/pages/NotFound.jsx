import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950 text-gray-900 dark:text-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur border border-white/60 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-teal-400/10 to-purple-500/10 blur-3xl" aria-hidden />
          <div className="relative px-8 py-12 sm:px-12 sm:py-14 space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-indigo-100/60 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 px-4 py-2 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              Page not found
            </div>

            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Lost in translation
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
                The page you are looking for doesn&apos;t exist. Let&apos;s get you back to the lessons so you can keep learning with Lexora.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                to="/"
                className="group w-full flex items-center justify-center gap-3 rounded-xl bg-indigo-600 text-white font-semibold px-4 py-3 shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition"
              >
                <span>Back to home</span>
                <span className="group-hover:translate-x-1 transition-transform" aria-hidden>
                  →
                </span>
              </Link>

              <Link
                to="/lessons"
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-200 font-semibold px-4 py-3 bg-white/60 dark:bg-gray-800/70 hover:border-indigo-400 dark:hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition"
              >
                Explore lessons
              </Link>
            </div>

            <div className="pt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Need help? Contact support@lexora.app</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
