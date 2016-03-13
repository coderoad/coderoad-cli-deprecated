import * as fs from 'fs';

export function fileExists(path: string): boolean {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    if (e) {
      if (e.code !== 'ENOENT') {
        console.log(e);
      }
      return false;
    }
  }
  return true;
}
