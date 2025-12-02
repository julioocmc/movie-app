/* eslint-disable @typescript-eslint/no-unused-vars */
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  imdbRating: string;
  Awards?: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

const BASE_URL = 'https://www.omdbapi.com/';

export async function searchMovies(
  query: string,
  page: number = 1,
  type?: string,
  year?: string
): Promise<SearchResponse | { error: string }> {
  try {
    const params = new URLSearchParams({
      apikey: import.meta.env.VITE_OMDB_KEY,
      s: query,
      page: String(page),
    });

    if (type && type !== 'all') {
      params.append('type', type);
    }

    if (year) {
      params.append('y', year);
    }

    const res = await fetch(`${BASE_URL}?${params.toString()}`);
    const data: SearchResponse = await res.json();
    return data;
  } catch (err) {
    return { error: 'No se pudo conectar con la API' };
  }
}

export async function getMovieDetails(
  id: string
): Promise<MovieDetails | { error: string }> {
  try {
    const res = await fetch(
      `${BASE_URL}?apikey=${import.meta.env.VITE_OMDB_KEY}&i=${id}&plot=full`
    );
    const data: MovieDetails = await res.json();
    return data;
  } catch (err) {
    return { error: 'No se pudo conectar con la API' };
  }
}
