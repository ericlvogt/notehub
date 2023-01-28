import { api } from "../utils/api";
import { useState } from "react";

export default function CreateNote() {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const mutation = api.note.create.useMutation();

    const handleSubmitNewNote = async (e : React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({name, path, classId: "123"});
      };

    return (
        <form onSubmit={handleSubmitNewNote} className="flex-col">
            <div className="my-2">
                <label htmlFor="name" className="text-notehub-dark dark:text-notehub-light">Name:</label>
                <input id="name" className="border rounded p-2 w-full text-notehub-dark dark:text-notehub-light dark:bg-notehub-dark" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="my-2">
                <label htmlFor="path" className="text-notehub-dark dark:text-notehub-light">Path:</label>
                <input id="path" className="border rounded p-2 w-full text-notehub-dark dark:text-notehub-light dark:bg-notehub-dark" type="text" placeholder="Path" value={path} onChange={(e) => setPath(e.target.value)} />
            </div>
            <button className="bg-notehub-secondary text-notehub-light rounded p-2 my-2" type="submit">Submit</button>
        </form>
    )
}