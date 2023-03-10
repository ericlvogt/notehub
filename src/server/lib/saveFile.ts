import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname } from "path"

const saveFile = ({path, data}:{path: string, data: string}) => {
    const directory = dirname(path);
    if (!existsSync(directory)){
        mkdirSync(directory, {recursive: true});
    }
    writeFileSync(path, data);
}

export default saveFile;