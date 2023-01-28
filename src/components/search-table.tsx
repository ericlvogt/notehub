import { type Note } from "@prisma/client"

export default function SearchTable({
    data
}:
{
    data: Array<Note> | undefined
}
) {
return (
    <div className="inline-block rounded-lg border shadow-2xl mx-auto overflow-hidden">
        <table className="text-black dark:text-white">
            <thead className="bg-notehub-tertiary text-black">
                <tr className="divide-x">
                    <th className="px-2 py-1">School</th>
                    <th className="px-2 py-1">Class</th>
                    <th className="px-2 py-1">Creator</th>
                    <th className="px-2 py-1">Note</th>
                    <th className="px-2 py-1">Path</th>
                </tr>
            </thead>
            <tbody>
                {
                data?.map((note
                    ) => 
                <tr key={note.id} className="divide-x">
                    <td className="px-2 py-1">{note.classId}</td>
                    <td className="px-2 py-1">{note.classId}</td>
                    <td className="px-2 py-1">{note.userId}</td>
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