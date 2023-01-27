import { type Note } from "@prisma/client"

export default function SearchTable({
    data
}:
{
    data: Array<Note> | undefined
}
) {
return (<table className="border-collapse border shadow-md bg-white mx-auto">
    <thead>
        <tr className="bg-gray-200 font-medium text-gray-800 border-b border-gray-300">
        <th className="px-4 py-2 text-left">Id</th>
        <th className="px-4 py-2 text-left">Note</th>
        <th className="px-4 py-2 text-left">Path</th>
        <th className="px-4 py-2 text-left">Creator</th>
        </tr>
    </thead>
    <tbody>
        {
        data?.map((note
            ) => 
        <tr key={note.id} className="bg-white hover:bg-gray-100">
            <td className="border px-4 py-2 text-sm text-gray-600">{note.id}</td>
            <td className="border px-4 py-2 text-sm text-gray-600">{note.name}</td>
            <td className="border px-4 py-2 text-sm text-gray-600">{note.path}</td>
            <td className="border px-4 py-2 text-sm text-gray-600">{note.creator}</td>
        </tr>
        )
        }
    </tbody>
    </table>)
}