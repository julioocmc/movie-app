import React from 'react';
import { motion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';

interface MovieShort {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Awards?: string;
}

interface MovieCardProps {
  movie: MovieShort;
  onClick?: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(movie.imdbID)) removeFavorite(movie.imdbID);
    else addFavorite(movie);
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onClick={() => onClick?.()}
      className="
        relative bg-white dark:bg-gray-800 shadow rounded-lg cursor-pointer
        overflow-hidden flex flex-col w-full
        sm:h-[360px] md:h-[380px] lg:h-[400px]
      "
    >
      <div className="rounded-md overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-700 h-48 sm:h-56 md:h-64 lg:h-72">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <motion.img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-fit"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/clapperboard.png';
            }}
          />
        ) : (
          <img
            src="/clapperboard.png"
            alt="No disponible"
            className="w-32 h-32 object-contain"
          />
        )}
      </div>

      <div className="p-2 flex-1 flex flex-col">
        <h3 className="mt-2 text-lg font-semibold line-clamp-2">
          {movie.Title}
        </h3>

        <div className="flex-1 overflow-y-auto mt-1 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Año:</strong> {movie.Year}
          </p>
          <p>
            <strong>Tipo:</strong> {movie.Type}
          </p>
          {movie.Awards && (
            <p>
              <strong>Premios:</strong> {movie.Awards}
            </p>
          )}
        </div>

        <motion.button
          onClick={handleFavoriteClick}
          whileTap={{ scale: 0.9 }}
          animate={isFavorite(movie.imdbID) ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.25 }}
          className="absolute bottom-2 right-2 text-xl"
          aria-label={
            isFavorite(movie.imdbID) ? 'Eliminar favorito' : 'Agregar favorito'
          }
        >
          {isFavorite(movie.imdbID) ? '❤️' : '🤍'}
        </motion.button>
      </div>
    </motion.div>
  );
}
