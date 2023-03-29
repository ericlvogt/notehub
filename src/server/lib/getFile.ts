import { readFileSync } from 'fs';

export const getFile = (path: string) => {
    return readFileSync(path);
}