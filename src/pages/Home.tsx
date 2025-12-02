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

  // 🔥 NUEVOS ESTADOS PARA FILTROS
  const [filterType, setFilterType] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const doSearch = (
    query: string,
    pg = 1,
    type = filterType,
    year = filterYear
  ) => {
    fetchMovies(query, pg, type, year);
  };

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    setPage(1);
    doSearch(query, 1);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    doSearch(currentQuery, p);
  };

  // 🔥 Cuando cambien los filtros, se dispara la búsqueda
  const handleFilterChange = (type: string, year: string) => {
    setFilterType(type);
    setFilterYear(year);
    setPage(1);

    if (currentQuery.trim().length > 0) {
      doSearch(currentQuery, 1, type, year);
    }
  };

  return (
    <div className="pt-10 pb-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">🎬 Movie Explorer</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Encuentra tus películas favoritas usando la API de OMDb.
      </p>

      {/* 🔥 AGREGARÁ UN COMPONENTE DE FILTROS LUEGO */}
      <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />

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
