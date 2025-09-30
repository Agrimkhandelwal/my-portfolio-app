'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

export default function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };
  
  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full max-w-md">
      <div className="relative flex-grow">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a technology, project, etc..."
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <button type="submit" className="bg-cyan-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-cyan-600 transition-colors">
        Search
      </button>
      {query && (
         <button type="button" onClick={handleClear} className="bg-gray-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
            Clear
        </button>
      )}
    </form>
  );
}
