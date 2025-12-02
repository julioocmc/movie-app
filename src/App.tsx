import { useState } from 'react';
import Home from './pages/Home';
import './App.css';
import Favorites from './pages/Favorites';

function App() {
  const [tab, setTab] = useState<'home' | 'favorites'>('home');

  return (
    <div>
      <div className="flex justify-center gap-6 py-4">
        <button
          onClick={() => setTab('home')}
          className={`px-4 py-2 rounded ${
            tab === 'home'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Inicio 🔍
        </button>

        <button
          onClick={() => setTab('favorites')}
          className={`px-4 py-2 rounded ${
            tab === 'favorites'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Favoritos ❤️
        </button>
      </div>

      {tab === 'home' && <Home />}
      {tab === 'favorites' && <Favorites />}
    </div>
  );
}

export default App;
