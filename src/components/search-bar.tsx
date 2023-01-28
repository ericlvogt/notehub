import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push({
        pathname: "/search",
        query: { 
            searchTerm: searchTerm
        }
    }).catch((e) => console.log(e));
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center py-2">
      <input
        id="search"
        type="text"
        placeholder='Search...'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="appearance-none text-notehub-dark bg-notehub-light dark:bg-notehub-dark dark:text-notehub-light border w-full mr-3 py-1 px-2 leading-tight"
      />
      <button type="submit" className="bg-notehub-secondary text-notehub-light py-2 px-4 rounded-lg hover:bg-notehub-secondary/80">Search</button>
    </form>
  );
};

export default SearchBar;
