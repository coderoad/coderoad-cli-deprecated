import * as fs from 'fs';

export function fileExists(path: string): boolean {
  try {
    fs.accessSync(path, fs.R_OK | fs.W_OK)
  } catch (e) {
    if (e) {
      console.log(e);
      return false;
    }
  }
  return true;
}
