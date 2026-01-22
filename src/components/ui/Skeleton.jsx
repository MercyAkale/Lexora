/**
 * Skeleton loading components for better UX
 */

export function SkeletonText({ lines = 1, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          style={{ width: i % 3 === 0 ? '100%' : i % 3 === 1 ? '85%' : '75%' }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4 animate-pulse" />
      <SkeletonText lines={3} />
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8 animate-pulse" />
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-pulse" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4 animate-pulse" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>

          <div className="md:col-span-2">
            <SkeletonCard className="mb-6">
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2 animate-pulse" />
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                  </div>
                ))}
              </div>
            </SkeletonCard>
            <SkeletonCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonList({ items = 5, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonButton({ className = '' }) {
  return (
    <div className={`h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} />
  );
}

export function SkeletonAvatar({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-32 h-32',
  };

  return (
    <div className={`${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse`} />
  );
}
