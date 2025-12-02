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
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-300">
        🎬 Movie Explorer App
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Encuentra tus películas favoritas usando la API de OMDb.
      </p>

      <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />

      {history.length > 0 && (
        <div className="mt-6 text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <h2 className="text-gray-700 dark:text-gray-300 font-semibold text-lg cursor-default">
              Búsquedas recientes
            </h2>

            <button
              onClick={clearHistory}
              className="text-sm text-red-500 hover:text-red-600 underline cursor-pointer transition"
            >
              Limpiar historial
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {history.map((item) => (
              <motion.button
                key={item}
                onClick={() => handleSearch(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="
            px-4 py-2 
            bg-gray-100 dark:bg-gray-800 
            text-gray-700 dark:text-gray-200 
            rounded-full 
            shadow-sm 
            hover:bg-gray-200 dark:hover:bg-gray-700 
            transition cursor-pointer text-sm
          "
              >
                {item}
              </motion.button>
            ))}
          </div>
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
