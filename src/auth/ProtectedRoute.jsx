import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-white/80 px-4 py-3 shadow-sm dark:border-indigo-900/50 dark:bg-gray-900/70">
          <span className="h-3 w-3 animate-ping rounded-full bg-indigo-500" aria-hidden />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
