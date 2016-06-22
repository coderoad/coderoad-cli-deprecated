import fileExists from 'node-file-exists';
import {readFileSync} from 'fs';
import {resolve} from 'path';

export default function getPackageJson(dir: string): PackageJson {
  const pathToPJ = resolve(dir, 'package.json');
  if (!fileExists(pathToPJ)) { return null; }
  const pj = readFileSync(pathToPJ, 'utf8');
  return JSON.parse(pj);
}
