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
        <div className="flex flex-col items-center justify-items-center gap-12 pt-16 ">
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
