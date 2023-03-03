import { type NextPage } from "next";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import NoteTable from "../components/note-table";

const Search: NextPage = () => {
    const router = useRouter();
    console.log(router.query);

    const {searchTerm} = router.query;
    
    const results = api.note.search.useQuery({
        name: searchTerm?.toString() ?? "",
    })

    return (
        <>
            <Layout>
                <div className="flex flex-col items-center justify-items-center">
                    <h1 className="font-bold pt-10 pb-5 text-5xl">Search</h1>
                    <NoteTable data={results.data ?? []}/>
                </div>
            </Layout>
            
        </>
    );
};

export default Search;