import { motion } from 'framer-motion';

export default function MovieCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-gray-800 shadow rounded-lg p-3"
    >
      <div className="w-full h-64 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md animate-pulse" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-3 w-3/4" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mt-2 w-1/2" />
    </motion.div>
  );
}
