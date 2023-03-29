import { type NextPage } from "next";
import Layout from "../../components/layout";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, type DragEvent, type ChangeEvent } from "react";
import { getBasePath } from "../../lib/getBasePath";

const NoteDetail: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const { note: routeNote, user: routeUser } = router.query;
  const [fileName, setFileName] = useState<string | null>();
  const [fileText, setFileText] = useState<string>();

  const note = api.note.searchFirst.useQuery(
    {
      name: routeNote as string,
      userName: routeUser as string,
    },
    {
      enabled: !!routeNote && fileName === undefined,
      onSuccess: (data) => {
        if (!data?.path || data.path === "") {
          setFileName(null);
          return;
        }

        setFileName(getBasePath(data.path));
      },
    }
  ).data;

  const fileQuery = api.note.getFile.useQuery(
    {
      id: note?.id as string,
    },
    {
      enabled: !!fileName && !fileText,
      onSuccess: (data) => {
        setFileText(data ?? "");
      }
    }
  )

  const fileMutation = api.note.saveFile.useMutation();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const fileReader = new FileReader();

  const onFileChange = (file: File | undefined) => {
    if (!file) {
      return;
    }
    setFileName(file.name);
    fileReader.onload = () => {
      setFileText(fileReader.result as string);
    };
    fileReader.readAsText(file);
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    onFileChange(event.dataTransfer.files?.[0]);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFileChange(event.currentTarget.files?.[0]);
  };

  const onSubmit = () => {
    if (!fileName || !note) {
      return;
    }
    fileMutation.mutate({
      noteId: note.id,
      fileName: fileName,
      data: fileText,
    });
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-items-center pb-10">
          <h1 className="pt-10 pb-5 text-5xl font-bold">{note?.name}</h1>
          <form onSubmit={onSubmit} className="w-full">
            <div className="flex h-1/2 w-full flex-col items-center justify-center gap-3 overflow-clip">
              <label
                htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 flex h-1/4 w-5/6 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={onDrop}
              >
                <div className="pointer-events-none flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 h-10 w-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    text files only
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={onChange}
                />
              </label>
              <button
                className="rounded bg-notehub-secondary p-2 text-notehub-light"
                type="submit"
              >
                Upload
              </button>
              {fileName ? (
                <div className="w-5/6 overflow-clip rounded-lg border">
                  <h1 className="border-b bg-notehub-primary py-1 pl-2 font-bold text-notehub-light">
                    {`${fileName}`}
                  </h1>
                  <div className="max-h-96 overflow-auto rounded-sm px-10">
                    <pre className="">{fileText}</pre>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default NoteDetail;