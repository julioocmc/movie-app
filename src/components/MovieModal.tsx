import { motion, AnimatePresence } from 'framer-motion';

interface MovieDetails {
  Title: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Awards?: string;
}

interface MovieModalProps {
  movie: MovieDetails | null;
  onClose: () => void;
}

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 10, scale: 0.98 },
};

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-black/70"
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          <motion.div
            className="relative bg-white dark:bg-gray-900 w-full max-w-2xl rounded-xl p-6 z-10 shadow-lg"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-600 dark:text-gray-200 text-2xl"
              aria-label="Cerrar"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <motion.img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                alt={movie.Title}
                className="w-48 rounded-lg shadow"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="text-gray-700 dark:text-gray-300 text-md space-y-3">
                <h2 className="text-2xl font-bold">{movie.Title}</h2>

                <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl leading-relaxed text-sm">
                  {movie.Plot}
                </p>

                <p>
                  <strong>Año:</strong> {movie.Year}
                </p>
                <p>
                  <strong>Director:</strong> {movie.Director}
                </p>
                <p>
                  <strong>Actores:</strong> {movie.Actors}
                </p>
                <p>
                  <strong>Género:</strong> {movie.Genre}
                </p>

                {movie.Awards && (
                  <p>
                    <strong>Premios:</strong> {movie.Awards}
                  </p>
                )}

                <p className="pt-2 font-semibold text-lg">
                  IMDb Rating: ⭐ {movie.imdbRating}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
