import {accessSync, F_OK} from 'fs';

export function fileExists(path: string): boolean {
  try {
    accessSync(path, F_OK);
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
