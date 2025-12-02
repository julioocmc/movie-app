import MovieCard from '../components/MovieCard';
import { useFavorites } from '../hooks/useFavorites';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="pt-10 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">❤️ Favoritos</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No tienes películas favoritas aún.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((m) => (
            <MovieCard key={m.imdbID} movie={m} onClick={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
