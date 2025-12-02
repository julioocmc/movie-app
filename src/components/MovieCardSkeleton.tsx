export default function MovieCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-3 animate-pulse">
      <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-3 w-3/4"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mt-2 w-1/2"></div>
    </div>
  );
}
