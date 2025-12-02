import { useFavorites } from '../hooks/useFavorites';

interface MovieCardProps {
  movie: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Awards?: string;
  };
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div
      onClick={onClick}
      className="relative bg-white shadow rounded-lg p-3 cursor-pointer hover:scale-105 transition"
    >
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded-md"
      />

      <h3 className="mt-2 text-lg font-semibold">{movie.Title}</h3>
      <p className="text-sm text-gray-500">{movie.Year}</p>

      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
        {movie.Type}
      </span>

      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 text-red-500 text-xl"
      >
        {isFavorite(movie.imdbID) ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
