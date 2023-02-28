import { type NextPage } from "next";
import Layout from "../components/layout";
import { api } from "../utils/api";
import { useSession } from "next-auth/react"
import React, { useState } from "react";
import DropdownSearch, { type DropdownItem } from "../components/dropdown-search";
import { useRouter } from "next/router";
import { School, Course, Note } from "@prisma/client";

const Create: NextPage = () => {
    const { data: sessionData, status } = useSession()
    const [name, setName] = useState("");
    const [schoolSearchTerm, setSchoolSearchTerm] = useState("");
    const [courseSearchTerm, setCourseSearchTerm] = useState("");
    const router = useRouter();

    const createSchoolMutation = api.school.create.useMutation(); 
    const createCourseMutation = api.course.create.useMutation();
    const createNoteMutation = api.note.create.useMutation();
    const schools = api.school.search.useQuery({
        name: schoolSearchTerm
    });

    const courses = api.course.search.useQuery({
        name: courseSearchTerm
    })

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status !== "authenticated") {
        return <p>Access Denied</p>
    }

    const handleSubmitNewNote = async (e: React.FormEvent) => {
        if (!submitIsValid()){
            console.log('prevented')
            e.stopPropagation();
            return;
        }
        
        let school: School;
        if (schools.data && schools.data.length === 1 && schools.data[0]?.name === schoolSearchTerm){
            school = schools.data[0];
        } else {
            school = await createSchoolMutation.mutateAsync({name: schoolSearchTerm});
        }
        
        let course: Course;
        if (courses.data && courses.data.length === 1 && courses.data[0]?.name === courseSearchTerm){
            course = courses.data[0];
        } else {
            course = await createCourseMutation.mutateAsync({name: courseSearchTerm, schoolId: school.id});
        }

        const note: Note = await createNoteMutation.mutateAsync({ name, path: "", courseId: course.id });
        // router.push(`/${sessionData.user?.name}/${note.name}`)
    };

    function submitIsValid(): boolean {
        if (!schoolSearchTerm || schoolSearchTerm === ""){
            return false;
        }
        if (!courseSearchTerm || courseSearchTerm === ""){
            return false;
        }
        return true;
    }

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
                            <label htmlFor="school">School</label>
                            <DropdownSearch items={schools.data?.map(x => ({ name: x.name } as DropdownItem))} 
                                placeholder="School" value={schoolSearchTerm} 
                                setValue={(value: string) => {setSchoolSearchTerm(value);}}
                                />
                        </div>
                            <label htmlFor="course">Course</label>
                            <DropdownSearch items={courses.data?.map(x => ({ name: x.name } as DropdownItem))} 
                                placeholder="Course" value={courseSearchTerm} 
                                setValue={(value: string) => {setCourseSearchTerm(value);}}
                                disabled={schoolSearchTerm === ""}
                                className="disabled:bg-notehub-highlightedLight disabled:dark:bg-notehub-highlightedDark"
                                />
                        <button className="bg-notehub-secondary text-notehub-light rounded p-2" type="submit">Submit</button>
                    </div>
                </form>
            </Layout>
        </>
    );
};

export default Create;