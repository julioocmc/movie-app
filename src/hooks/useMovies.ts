import { useState } from 'react';
import {
  searchMovies,
  getMovieDetails,
  type Movie,
  type MovieDetails,
} from '../services/omdb';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async (query: string, page: number = 1) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');

    const res = await searchMovies(query, page);

    if ('error' in res) {
      setError(res.error);
      setMovies([]);
      setTotalResults(0);
    } else if (res.Response === 'False') {
      setError(res.Error || 'Sin resultados');
      setMovies([]);
      setTotalResults(0);
    } else {
      setMovies(res.Search);
      setTotalResults(Number(res.totalResults));
    }

    setLoading(false);
  };

  const fetchDetails = async (id: string) => {
    setLoading(true);
    const res = await getMovieDetails(id);
    if ('error' in res) {
      setError(res.error);
      setDetails(null);
    } else {
      setDetails(res);
    }
    setLoading(false);
  };

  const clearDetails = () => setDetails(null);

  return {
    movies,
    details,
    totalResults,
    loading,
    error,
    fetchMovies,
    fetchDetails,
    clearDetails,
  };
}
