const getFilePath = ({
  noteId,
  fileName,
}: {
  noteId: string;
  fileName: string;
}) => {
  return `${process.cwd()}\\data\\${noteId}\\${fileName}`;
};

export default getFilePath;
