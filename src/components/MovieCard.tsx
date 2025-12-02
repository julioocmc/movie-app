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
      className="relative bg-white dark:bg-gray-800 shadow rounded-lg p-3 cursor-pointer overflow-hidden"
    >
      <div className="rounded-md overflow-hidden">
        <motion.img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
          alt={movie.Title}
          className="w-full h-64 object-cover"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <h3 className="mt-2 text-lg font-semibold line-clamp-2">{movie.Title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-300">{movie.Year}</p>

      <span className="text-xs inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded mt-2">
        {movie.Type}
      </span>

      <motion.button
        onClick={handleFavoriteClick}
        whileTap={{ scale: 0.9 }}
        animate={isFavorite(movie.imdbID) ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.25 }}
        className="absolute top-2 right-2 text-xl"
        aria-label={
          isFavorite(movie.imdbID) ? 'Eliminar favorito' : 'Agregar favorito'
        }
      >
        {isFavorite(movie.imdbID) ? '❤️' : '🤍'}
      </motion.button>
    </motion.div>
  );
}
