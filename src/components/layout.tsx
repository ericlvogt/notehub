import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState, type ReactNode } from 'react';
import SearchBar from './search-bar';

export default function Layout({
  children,
  home,
}:
  {
    children: ReactNode,
    home?: boolean,
  }) {
  const handleToggleDarkMode = () => {
    const nextDarkMode = !darkMode;
    setDarkMode(nextDarkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
    else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  }

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="">
      <Head>
        <title>NoteHub</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex w-screen items-center items fixed bg-notehub-primary">
        <div className='px-2'>
          <Link className="bg-notehub-secondary rounded-xl text-lg font-extrabold text-notehub-light px-3 py-1 hover:bg-notehub-secondary/80" href="/">
            NoteHub
          </Link>
        </div>
        <div className='px-2'>
          <SearchBar />
        </div>
        <div>
          <button
            id="theme-toggle"
            type="button"
            className="bg-notehub-secondary px-2 py-2 rounded-full hover:bg-notehub-secondary/80"
            onClick={handleToggleDarkMode}
          >
            {darkMode ?
              (
                <svg
                  id="theme-toggle-light-icon"
                  className="w-5 h-5 fill-notehub-tertiary"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  id="theme-toggle-dark-icon"
                  className="w-5 h-5 fill-notehub-tertiary"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                  ></path>
                </svg>
              )
            }
          </button>
        </div>
      </header>
      <main className='flex min-h-screen flex-col items-center justify-center bg-notehub-light dark:bg-notehub-dark'>
        {children}
      </main>
      {!home && (
        <div className="table-footer-group">
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}