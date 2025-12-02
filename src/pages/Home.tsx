import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import MovieModal from '../components/MovieModal';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import { useMovies } from '../hooks/useMovies';

export default function Home() {
  const {
    movies,
    details,
    totalResults,
    loading,
    error,
    fetchMovies,
    fetchDetails,
    clearDetails,
  } = useMovies();

  const [page, setPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    setPage(1);
    fetchMovies(query, 1);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    fetchMovies(currentQuery, p);
  };

  return (
    <div className="pt-10 pb-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">🎬 Movie Explorer</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Encuentra tus películas favoritas usando la API de OMDb.
      </p>

      <SearchBar onSearch={handleSearch} />

      {error && <p className="text-center text-red-500 mt-6">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))
          : movies.map((m) => (
              <MovieCard
                key={m.imdbID}
                movie={m}
                onClick={() => fetchDetails(m.imdbID)}
              />
            ))}
      </div>

      {!loading && movies.length > 0 && (
        <Pagination
          currentPage={page}
          total={totalResults}
          onChange={handlePageChange}
        />
      )}

      <MovieModal movie={details} onClose={clearDetails} />
    </div>
  );
}
