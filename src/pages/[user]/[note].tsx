import { type NextPage } from "next";
import Layout from "../../components/layout";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useState, type DragEvent, type ChangeEvent } from "react";
import { basename } from "path"

const NoteDetail: NextPage = () => {
    const { status } = useSession()
    const router = useRouter();

    const {note: routeNote, user: routeUser} = router.query;
    const [fileName, setFileName] = useState("");
    const [fileText, setFileText] = useState("");

    const note = api.note.searchFirst.useQuery({
        name: routeNote as string,
        userName: routeUser as string
    }, {enabled: !!routeNote,
        onSuccess: (data) => {
            if (!data?.path){
                return;
            }
            setFileName(basename(data.path));
            fetch(`file://${data.path}`).then((response) => {
                response.text().then((value) => setFileText(value)).catch((e) => console.error("error"))
            }).catch((e) => console.error("error"))
        }}).data;

    const fileMutation = api.note.saveFile.useMutation();

    if (status === "loading") {
        return <p>Loading...</p>
    }

    const fileReader = new FileReader();

    const onFileChange = (file: File | undefined) => {
        if (!file){
            return;
        }
        setFileName(file.name);
        fileReader.onload = () => {
            setFileText(fileReader.result as string);
        }
        fileReader.readAsText(file);
    }

    const onDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault(); 
        onFileChange(event.dataTransfer.files?.[0]);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        onFileChange(event.currentTarget.files?.[0]);
    };

    const onSubmit = () => {
        if (!fileName || !note){
            return;
        }
        fileMutation.mutate({noteId: note.id, fileName: fileName, data: fileText});
    }

    return (
        <>
            <Layout>
                <div className="flex flex-col justify-items-center items-center pb-10">
                    <h1 className="font-bold pt-10 pb-5 text-5xl">{note?.name}</h1>
                    <form onSubmit={onSubmit} className="w-full">                        
                        <div className="flex flex-col items-center justify-center w-full h-1/2 overflow-clip gap-3">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-5/6 h-1/4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    onDragOver={(e) => {e.preventDefault();}}
                                    onDrop={onDrop}
                                    >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">text files only</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={onChange}/>
                            </label>
                            <button className="bg-notehub-secondary text-notehub-light rounded p-2" type="submit">Upload</button>
                            {
                                fileName != "" ? 
                                <div className="border rounded-lg w-5/6 overflow-clip">
                                    <h1 className="border-b bg-notehub-primary font-bold py-1 pl-2 text-notehub-light">
                                        {`${fileName}`}
                                    </h1>
                                    <div className="overflow-auto max-h-96 rounded-sm px-10">
                                        <pre className="">
                                            {fileText}
                                        </pre>

                                    </div>
                                </div>
                                :
                                <></>
                            }
                            
                        </div> 
                    </form>
                    

                </div>
            </Layout>
        </>
    );
};

export default NoteDetail;