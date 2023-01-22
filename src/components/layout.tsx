import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
import SearchBar from './search-bar';

export default function Layout({
    children, 
    home,
}:
{
    children: ReactNode,
    home: boolean,
}) 
{
  return (
    <div className="">
      <Head>
        <title>NoteHub</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex min-h-fit items-center items">
        <Link className='px-2' href="/">
            NoteHub
        </Link>
        <div className='px-2'>
          <SearchBar/>
        </div>
      </header>
      <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]'>
        {children}
      </main>
      {!home && (
        <div className="">
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}