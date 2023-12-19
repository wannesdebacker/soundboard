import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const soundsDir = "./public/sounds/";

interface SoundFile {
    name: string;
    location: string;
}

interface SoundFiles {
    [key: string]: SoundFile[];
}

const getSoundFilesFromFolder = (folder: string): SoundFile[] => {
    try {
        return readdirSync(join(soundsDir, folder)).map(file => ({
            name: file?.replace?.(/\.[^\.]*$/, '')?.replace?.(/[-_]/g, ' ')?.replace?.(/(^\w{1}| \w{1})/g, match => match.toUpperCase()), // Strip off the file extension using regex
            location: join(soundsDir.replace('/public', ''), folder, file),
        }));
    } catch (e) {
        console.error(`Error reading the directory for folder ${folder}:`, e.message);
        return [];
    }
}

export const getSoundFolders = (): string[] => {
    try {
        return readdirSync(soundsDir).filter(dir => statSync(join(soundsDir, dir)).isDirectory());
    } catch (e) {
        console.error("Error reading the directory:", e.message);
        return [];
    }
}

export const getSoundFiles = (): SoundFiles => {
    const folders = getSoundFolders();
    const sounds: SoundFiles = {};

    folders.forEach(folder => {
        const soundFiles = getSoundFilesFromFolder(folder);
        if (soundFiles.length > 0) {
            sounds[folder] = soundFiles;
        }
    });

    return sounds;
}
