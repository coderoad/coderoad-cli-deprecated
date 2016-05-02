import {validatePackageName} from './validate';
import {createPackageJson, createTutorialMd, createTestFiles} from './write-demo';
import build from '../build/build';

export default function create(name: string): void {
  // check
  validatePackageName(name);

  // continue
  process.stdout.write(`Creating demo tutorial "coderoad-${name}"...`);

  // npm package
  Promise.all([
    createPackageJson(name),
    createTutorialMd(),
    createTestFiles()
  ]).then(() => {
    build('tutorial/tutorial.md', 'coderoad.json');
  });
}
