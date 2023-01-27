import { type NextPage } from "next";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import SearchTable from "../components/search-table";

const Search: NextPage = () => {
    const router = useRouter();
    console.log(router.query);

    const {searchTerm} = router.query;
    
    const results = api.note.search.useQuery({
        name: searchTerm?.toString() ?? "",
        creator: "",
    })

    return (
        <>
            <Layout>
                <div>
                    <SearchTable data={results.data}/>
                </div>
            </Layout>
            
        </>
    );
};

export default Search;