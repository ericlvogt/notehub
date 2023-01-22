import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push('/search');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center border-b border-teal-500 py-2">
      <input
        id="search"
        type="text"
        placeholder='Search...'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="appearance-none bg-transparent border w-full text-gray-700 mr-3 py-1 px-2 leading-tight"
      />
      <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600">Search</button>
    </form>
  );
};

export default SearchBar;
