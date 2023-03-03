import { type NextPage } from "next";
import Layout from "../../components/layout";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

const NoteDetail: NextPage = () => {
    const { status } = useSession()
    const router = useRouter();

    const {note: queryNote} = router.query;

    const note = api.note.searchFirst.useQuery({
        name: queryNote as string
    }).data;

    if (status === "loading") {
        return <p>Loading...</p>
    }

    return (
        <>
            <Layout>
                <div className="flex flex-col justify-items-center items-center">
                    <h1 className="font-bold pt-10 pb-5 text-5xl">{note?.name}</h1>
                </div>
            </Layout>
        </>
    );
};

export default NoteDetail;