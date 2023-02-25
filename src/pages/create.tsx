import { type NextPage } from "next";
import Layout from "../components/layout";
import { api } from "../utils/api";
import { useSession } from "next-auth/react"
import React, { useState } from "react";
import DropdownSearch, { type DropdownItem } from "../components/dropdown-search";

const Create: NextPage = () => {
    const { data: sessionData, status } = useSession()
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [schoolSearchTerm, setSchoolSearchTerm] = useState("");
    const [courseSearchTerm, setCourseSearchTerm] = useState("");
    const mutation = api.note.create.useMutation();
    const schools = api.school.search.useQuery({
        name: schoolSearchTerm
    }
    );

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status !== "authenticated") {
        return <p>Access Denied</p>
    }

    const handleSubmitNewNote = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ name, path, courseId: "123" });
    };

    return (
        <>
            <Layout>
                <h1 className="text-lg font-bold">Create</h1>
                <form onSubmit={handleSubmitNewNote}>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex flex-row items-end">
                            <div className="flex flex-col">
                                <label htmlFor="creator">Creator</label>
                                <span id="creator" className="pointer-events-none border rounded p-2 whitespace-nowrap">{sessionData.user?.name}</span>
                            </div>
                            <span className="p-2 whitespace-nowrap px-2 ">/</span>
                            <div>
                                <label htmlFor="repository">Repository</label>
                                <input id="repository" className="bg-inherit text-inherit border rounded p-2 w-full" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="path">Path</label>
                            <input id="path" className="bg-inherit text-inherit border rounded p-2 w-full" type="text" placeholder="Path" value={path} onChange={(e) => setPath(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="school">School</label>
                            <DropdownSearch items={schools.data?.map(x => ({ name: x.name } as DropdownItem))} 
                                placeholder="School" value={schoolSearchTerm} 
                                setValue={(value: string) => {setSchoolSearchTerm(value);}}
                                />
                        </div>
                        <div>
                            <label htmlFor="course">Course</label>
                            <input id="course" disabled={schoolSearchTerm === ""} 
                                className="bg-inherit disabled:bg-notehub-highlightedLight disabled:dark:bg-notehub-highlightedDark border rounded p-2 w-full" type="text" placeholder="Course" 
                                value={courseSearchTerm} onChange={(e) => setCourseSearchTerm(e.target.value)} />
                        </div>
                        <button className="bg-notehub-secondary text-notehub-light rounded p-2" type="submit">Submit</button>
                    </div>
                </form>
            </Layout>
        </>
    );
};

export default Create;