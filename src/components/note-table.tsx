import { type Note, type User, type Course, type School } from "@prisma/client"
import { useRouter } from "next/router";

export default function NoteTable({
    data
}:
    {
        data: Array<Note & {
            user: User;
            course: Course & {
                school: School;
            };
        }>
    }
) {
    const router = useRouter();

    return (
        <div className="inline-block rounded-lg border shadow-2xl overflow-hidden">
            <table>
                <thead className="bg-notehub-primary text-notehub-light">
                    <tr className="divide-x">
                        <th className="px-2 py-1">School</th>
                        <th className="px-2 py-1">Course</th>
                        <th className="px-2 py-1">Creator</th>
                        <th className="px-2 py-1">Note</th>
                        <th className="px-2 py-1">Path</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((note
                        ) =>
                            <tr key={note.id} className="divide-x hover:cursor-pointer hover:bg-notehub-highlightedLight hover:dark:bg-notehub-highlightedDark" 
                                onClick={() => router.push(`/${note.user.name as string}/${note.name}`)}
                                >
                                <td className="px-2 py-1">{note.course.school.name}</td>
                                <td className="px-2 py-1">{note.course.name}</td>
                                <td className="px-2 py-1">{note.user.name}</td>
                                <td className="px-2 py-1">{note.name}</td>
                                <td className="px-2 py-1">{note.path}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}