import { useState, type FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange?: (type: string, year: string) => void;
}

export default function SearchBar({
  onSearch,
  onFilterChange,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    if (trimmed.length > 50) return;
    onSearch(trimmed);
  };

  const notifyFilters = (newType: string, newYear: string) => {
    if (onFilterChange) {
      onFilterChange(newType, newYear);
    }
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    notifyFilters(value, year);
  };

  const handleYearChange = (value: string) => {
    if (/^\d{0,4}$/.test(value)) {
      setYear(value);
      notifyFilters(type, value);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex w-full px-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar película..."
          className="flex-1 p-3 rounded-l-xl border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="px-5 bg-blue-600 text-white rounded-r-xl hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      <div className="flex gap-3 justify-center">
        <select
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        >
          <option value="">Todos</option>
          <option value="movie">Películas</option>
          <option value="series">Series</option>
        </select>

        <input
          type="text"
          value={year}
          onChange={(e) => handleYearChange(e.target.value)}
          placeholder="Año"
          className="w-28 p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        />
      </div>
    </div>
  );
}
