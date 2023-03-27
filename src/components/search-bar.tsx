import React, { useState } from "react";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router
      .push({
        pathname: "/search",
        query: {
          searchTerm: searchTerm,
        },
      })
      .catch((e) => console.log(e));
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center py-2">
      <input
        id="search"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="mr-3 rounded-md bg-notehub-light py-1 px-2 text-notehub-dark focus:w-full dark:bg-notehub-dark dark:text-notehub-light"
      />
      <button
        type="submit"
        className="rounded-lg bg-notehub-secondary py-2 px-4 text-notehub-light hover:bg-notehub-secondary/80"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
