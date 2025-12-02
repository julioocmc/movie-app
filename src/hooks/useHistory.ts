import { useEffect, useState } from 'react';

export function useHistory(limit = 10) {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('search_history');
    if (saved) {
      setTimeout(() => {
        setHistory(JSON.parse(saved));
      }, 0);
    }
  }, []);

  const save = (list: string[]) => {
    localStorage.setItem('search_history', JSON.stringify(list));
  };

  const addSearch = (term: string) => {
    if (!term) return;

    let updated = [term, ...history.filter((h) => h !== term)];

    if (updated.length > limit) {
      updated = updated.slice(0, limit);
    }

    setHistory(updated);
    save(updated);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('search_history');
  };

  return {
    history,
    addSearch,
    clearHistory,
  };
}
