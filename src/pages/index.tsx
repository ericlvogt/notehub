import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import React, { useState } from "react";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import SearchTable from "../components/search-table";

const Home: NextPage = () => {
  const mutation = api.note.create.useMutation();
  const notes = api.note.getAll.useQuery();
  
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [creator, setCreator] = useState("");
  
  const router = useRouter();

  const handleSubmitNewNote = async (e : React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({name, path, classId: "123"});
    await notes.refetch();
  };

  return (
    <>
      <Layout home>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-notehub-dark dark:text-notehub-light sm:text-[5rem]">
            NoteHub
          </h1>
          <form onSubmit={handleSubmitNewNote} className="flex-col">
            <div className="my-2">
              <label htmlFor="name" className="text-notehub-dark dark:text-notehub-light">Name:</label>
              <input id="name" className="border rounded p-2 w-full text-notehub-dark dark:text-notehub-light dark:bg-notehub-dark" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="my-2">
              <label htmlFor="path" className="text-notehub-dark dark:text-notehub-light">Path:</label>
              <input id="path" className="border rounded p-2 w-full text-notehub-dark dark:text-notehub-light dark:bg-notehub-dark" type="text" placeholder="Path" value={path} onChange={(e) => setPath(e.target.value)}/>
            </div>
            <div className="my-2">
              <label htmlFor="creator" className="text-notehub-dark dark:text-notehub-light">Creator:</label>
              <input id="creator" className="border rounded p-2 w-full text-notehub-dark dark:text-notehub-light dark:bg-notehub-dark" type="text" placeholder="Creator" value={creator} onChange={(e) => setCreator(e.target.value)}/>
            </div>
            <button className="bg-notehub-secondary text-notehub-light rounded p-2 my-2" type="submit">Submit</button>
          </form>
          <SearchTable data={notes.data}/>
          
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-notehub-light/10 p-4 text-notehub-light hover:bg-notehub-light/20"
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
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-notehub-light/10 p-4 text-notehub-light hover:bg-notehub-light/20"
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
            <p className="text-2xl text-notehub-light">
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
      <p className="text-center text-2xl text-notehub-light">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-notehub-light/10 px-10 py-3 font-semibold text-notehub-light no-underline transition hover:bg-notehub-light/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
