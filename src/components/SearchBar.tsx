import { useState, type FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    if (trimmed.length > 50) return;
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl mx-auto px-2">
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
  );
}
