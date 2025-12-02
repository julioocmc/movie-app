interface MovieCardProps {
  movie: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  };
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow rounded-lg p-3 cursor-pointer hover:scale-105 transition"
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
    </div>
  );
}
