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

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 text-2xl"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
            alt={movie.Title}
            className="w-48 rounded-lg shadow"
          />

          <div>
            <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
            <p className="text-gray-700 text-sm mb-2">{movie.Plot}</p>
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
            <p className="mt-3 font-semibold">
              IMDb Rating: ⭐ {movie.imdbRating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
