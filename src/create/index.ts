import {validatePackageName} from './validate';
import {createPackageJson, createTutorialMd} from './write-demo';
import build from '../build/build';

export default function create(name: string): boolean | Promise<boolean> {
  // check
  if (!validatePackageName(name)) {
    return false;
  }

  // continue
  process.stdout.write(`Creating demo tutorial "coderoad-${name}"...`);

  // npm package
  return Promise.all([
    createPackageJson(name),
    createTutorialMd()
  ]).then(() => {
    build('tutorial/tutorial.md', 'coderoad.json');
    return true;
  });
}
