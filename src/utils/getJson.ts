import fileExists from 'node-file-exists';
import {readFileSync} from 'fs';
import {resolve} from 'path';

export default function getJson(dir: string, file: string): Object {
  const pathToFile = resolve(dir, file);
  if (!fileExists(pathToFile)) { return null; }
  return JSON.parse(readFileSync(pathToFile, 'utf8'));
}
