import { useState } from 'react';

interface Props {
  onChange: (filters: { type: string; year: string }) => void;
}

export default function Filters({ onChange }: Props) {
  const [type, setType] = useState('all');
  const [year, setYear] = useState('');

  const handleApply = () => {
    onChange({ type, year });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4 justify-center">
      {/* Tipo */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-white"
      >
        <option value="all">Todos</option>
        <option value="movie">Películas</option>
        <option value="series">Series</option>
        <option value="episode">Episodios</option>
      </select>

      {/* Año */}
      <input
        type="number"
        placeholder="Año"
        min="1900"
        max="2025"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border p-2 rounded w-28 bg-white dark:bg-gray-800 dark:text-white"
      />

      <button
        onClick={handleApply}
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      >
        Aplicar
      </button>
    </div>
  );
}
