import fileExists from 'node-file-exists';
import {readFileSync} from 'fs';

export default function getPackageJson(): PackageJson {
  const pathToPJ = './package.json';
  if (!fileExists(pathToPJ)) { return null; }
  const pj = readFileSync(pathToPJ, 'utf8');
  return JSON.parse(pj);
}
