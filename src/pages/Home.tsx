import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import MovieModal from '../components/MovieModal';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import { useMovies } from '../hooks/useMovies';
import { useHistory } from '../hooks/useHistory';

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
  hidden: {},
};

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
  const { history, addSearch, clearHistory } = useHistory();

  const [page, setPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');

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

  const handlePageChange = (p: number) => {
    setPage(p);
    doSearch(currentQuery, p);
  };

  const handleFilterChange = (type: string, year: string) => {
    setFilterType(type);
    setFilterYear(year);
    setPage(1);

    if (currentQuery.trim().length > 0) {
      doSearch(currentQuery, 1, type, year);
    }
  };

  const handleSearch = (query: string) => {
    addSearch(query);
    setCurrentQuery(query);
    setPage(1);
    fetchMovies(query, 1);
  };

  return (
    <div className="pt-10 pb-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">🎬 Movie Explorer</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Encuentra tus películas favoritas usando la API de OMDb.
      </p>

      <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />

      {history.length > 0 && (
        <div className="mt-4 text-center">
          <h2 className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            Búsquedas recientes
          </h2>

          <div className="flex flex-wrap justify-center gap-2">
            {history.map((item) => (
              <motion.button
                key={item}
                onClick={() => handleSearch(item)}
                whileHover={{ scale: 1.03 }}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-xl text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {item}
              </motion.button>
            ))}
          </div>

          <button
            onClick={clearHistory}
            className="mt-3 text-xs text-red-500 hover:underline"
          >
            Limpiar historial
          </button>
        </div>
      )}

      {error && <p className="text-center text-red-500 mt-6">{error}</p>}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8"
      >
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))
          : movies.map((m) => (
              <motion.div key={m.imdbID} layout>
                <MovieCard movie={m} onClick={() => fetchDetails(m.imdbID)} />
              </motion.div>
            ))}
      </motion.div>

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
