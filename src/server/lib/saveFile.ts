import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname } from "path"

const saveFile = async ({noteId, fileName}:{noteId: string, fileName: string}) => {
    const filePath = `${process.cwd()}\\data\\${noteId}\\${fileName}`
    const directory = dirname(filePath);
    if (!existsSync(directory)){
        mkdirSync(directory, {recursive: true});
    }
    writeFileSync(filePath, '');
}

export default saveFile;