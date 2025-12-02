import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  total,
  onChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / 10);
  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center gap-4 mt-6"
    >
      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer hover:bg-gray-400"
      >
        Anterior
      </motion.button>

      <span className="font-medium">
        Página {currentPage} de {totalPages}
      </span>

      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer hover:bg-gray-400"
      >
        Siguiente
      </motion.button>
    </motion.div>
  );
}
