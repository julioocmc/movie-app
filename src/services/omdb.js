const BASE_URL = 'https://www.omdbapi.com/';

export async function searchMovies(query, page = 1) {
  try {
    const res = await fetch(
      `${BASE_URL}?apikey=${
        import.meta.env.VITE_OMDB_KEY
      }&s=${query}&page=${page}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    return { error: true, message: 'No se pudo conectar con la API' };
  }
}

export async function getMovieDetails(id) {
  try {
    const res = await fetch(
      `${BASE_URL}?apikey=${import.meta.env.VITE_OMDB_KEY}&i=${id}&plot=full`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    return { error: true, message: 'No se pudo conectar con la API' };
  }
}
