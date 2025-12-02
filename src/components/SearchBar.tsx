import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

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
    if (onFilterChange) onFilterChange(newType, newYear);
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
        <motion.input
          whileFocus={{ scale: 1.01 }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar película..."
          className="flex-1 p-3 rounded-l-xl border text-gray-700 dark:text-gray-300 border-gray-300 focus:outline-none"
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.96 }}
          className="px-5 bg-gray-700 text-white rounded-r-xl hover:bg-gray-800 cursor-pointer"
        >
          Buscar
        </motion.button>
      </form>

      <div className="flex gap-3 justify-center">
        <select
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white cursor-pointer"
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
          className="w-28 p-2 border rounded-lg dark:bg-gray-800 dark:text-white cursor-pointer"
        />
      </div>
    </div>
  );
}
