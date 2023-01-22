import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import React, { useState } from "react";
import { Note } from "@prisma/client";
import Layout from "../components/layout";

const Home: NextPage = () => {
  // const no = api.example.hello.useQuery({ text: "from tRPC" });
  const mutation = api.note.create.useMutation();
  let notes = api.note.getAll.useQuery();
  
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [creator, setCreator] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchCreator, setSearchCreator] = useState("");

  const handleSubmitNewNote = (e : React.FormEvent) => {
    mutation.mutate({name, creator, path});
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    //does nothing right now
  }

  return (
    <>
      <Layout home>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            NoteHub
          </h1>
          <form onSubmit={handleSubmitSearch}>
            <input
              type="text"
              placeholder="Name..."
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Creator..."
              value={searchCreator}
              onChange={e => setSearchCreator(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <form onSubmit={handleSubmitNewNote} className="flex-col">
            <div className="my-2">
              <label htmlFor="name" className="text-cyan-50">Name:</label>
              <input id="name" className="border rounded p-2 w-full text-black" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="my-2">
              <label htmlFor="path" className="text-cyan-50">Path:</label>
              <input id="path" className="border rounded p-2 w-full text-black" type="text" placeholder="Path" value={path} onChange={(e) => setPath(e.target.value)}/>
            </div>
            <div className="my-2">
              <label htmlFor="creator" className="text-cyan-50">Creator:</label>
              <input id="creator" className="border rounded p-2 w-full text-black" type="text" placeholder="Creator" value={creator} onChange={(e) => setCreator(e.target.value)}/>
            </div>
            <button className="bg-blue-500 text-white rounded p-2 my-2" type="submit">Submit</button>
          </form>
          <div className="w-full">
          <table className="border-collapse border shadow-md bg-white mx-auto">
            <thead>
              <tr className="bg-gray-200 font-medium text-gray-800 border-b border-gray-300">
                <th className="px-4 py-2 text-left">Id</th>
                <th className="px-4 py-2 text-left">Note</th>
                <th className="px-4 py-2 text-left">Path</th>
                <th className="px-4 py-2 text-left">Creator</th>
              </tr>
            </thead>
            <tbody>
              {
                notes.data?.map((note
                  ) => 
                <tr key={note.id} className="bg-white hover:bg-gray-100">
                  <td className="border px-4 py-2 text-sm text-gray-600">{note.id}</td>
                  <td className="border px-4 py-2 text-sm text-gray-600">{note.name}</td>
                  <td className="border px-4 py-2 text-sm text-gray-600">{note.path}</td>
                  <td className="border px-4 py-2 text-sm text-gray-600">{note.creator}</td>
                </tr>
                )
              }
            </tbody>
          </table>
          </div>
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div> */}
        </div>
      </Layout>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
