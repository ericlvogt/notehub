import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import React from "react";
import Layout from "../components/layout";
import NoteTable from "../components/note-table";

const Home: NextPage = () => {
  
  const notes = api.note.search.useQuery({
    name: ""
  });

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-items-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            NoteHub
          </h1>
          <NoteTable data={notes.data ?? []}/>
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
        className="rounded-full bg-notehub-primary px-10 py-3 font-semibold text-notehub-light no-underline transition hover:bg-notehub-primary/80"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
