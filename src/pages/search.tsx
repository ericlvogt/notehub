import { NextPage } from "next";
import Layout from "../components/layout";

interface SearchCriteria{

}

const Search: NextPage = () => {
    return (
        <>
            <Layout home={false}>
                <div>
                    <h1>Hi</h1>
                </div>
            </Layout>
            
        </>
    );
};

export default Search;