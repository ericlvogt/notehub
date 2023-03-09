import { type NextPage } from "next";
import Layout from "../../components/layout";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useState } from "react";

const NoteDetail: NextPage = () => {
    const { status } = useSession()
    const router = useRouter();

    const {note: queryNote} = router.query;
    const [file, setFile] = useState<File | undefined>(undefined);

    const note = api.note.searchFirst.useQuery({
        name: queryNote as string
    }, {enabled: !!queryNote}).data;

    const fileMutation = api.note.saveFile.useMutation();

    if (status === "loading") {
        return <p>Loading...</p>
    }

    const onDrop = (event: any) => {
        event.preventDefault(); 
        setFile(event.dataTransfer.files?.[0]);
    };

    const onChange = (event: any) => {
        setFile(event.currentTarget.files?.[0]);
    };

    const onSubmit = () => {
        if (!file || !note){
            return;
        }
        fileMutation.mutate({noteId: note.id, fileName: file.name});
    }

    return (
        <>
            <Layout>
                <div className="flex flex-col justify-items-center items-center">
                    <h1 className="font-bold pt-10 pb-5 text-5xl">{note?.name}</h1>
                    <form onSubmit={onSubmit} className="w-full">
                        <div className="flex flex-col items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-1/2 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    onDragOver={(e) => {e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; console.log('dragOver')}}
                                    onDragLeave={(e) => {console.log('dragLeave')}}
                                    onDrop={onDrop}
                                    >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
                                    {
                                        file ? 
                                        <p>
                                            {`${file.name}\n${file.type}`}
                                        </p>
                                        :
                                        <></>
                                    }
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={onChange}/>
                            </label>
                            <button className="bg-notehub-secondary text-notehub-light rounded p-2 mt-2" type="submit">Upload</button>
                        </div> 
                    </form>
                    

                </div>
            </Layout>
        </>
    );
};

export default NoteDetail;