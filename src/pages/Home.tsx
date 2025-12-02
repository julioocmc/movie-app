import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const dummyMovie = {
    Title: 'Batman Begins',
    Year: '2005',
    imdbID: 'tt0372784',
    Type: 'movie',
    Poster: '/placeholder.png',
  };

  return (
    <div className="pt-10 pb-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">🎬 Movie Explorer</h1>
      <p className="text-center text-gray-600 mb-6">
        Encuentra tus películas favoritas usando la API de OMDb.
      </p>

      <SearchBar onSearch={(q) => console.log(q)} />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
        <MovieCard movie={dummyMovie} onClick={() => alert('Click')} />
        <MovieCard movie={dummyMovie} onClick={() => alert('Click')} />
        <MovieCard movie={dummyMovie} onClick={() => alert('Click')} />
      </div>
    </div>
  );
}
