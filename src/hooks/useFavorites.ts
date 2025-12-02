/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import type { Movie } from '../services/omdb';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const save = (data: Movie[]) => {
    setFavorites(data);
    localStorage.setItem('favorites', JSON.stringify(data));
  };

  const addFavorite = (movie: Movie) => {
    if (favorites.some((m) => m.imdbID === movie.imdbID)) return;
    save([...favorites, movie]);
  };

  const removeFavorite = (id: string) => {
    const filtered = favorites.filter((m) => m.imdbID !== id);
    save(filtered);
  };

  const isFavorite = (id: string) => favorites.some((m) => m.imdbID === id);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
