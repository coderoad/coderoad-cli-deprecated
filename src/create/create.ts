import {validatePackageName} from './validate';
import {createPackageJson, createTutorialMd, createTestFiles} from './write-demo';
import build from '../build/build';

export default function create(name: string): void {
  // check
  validatePackageName(name);

  // continue
  console.log('Creating demo tutorial...');

  // npm package
  createPackageJson(name);
  // create tutorial.md
  createTutorialMd();
  // tests folder with sample test
  createTestFiles();

  const tutorial = 'tutorial/tutorial.md';
  const output = 'coderoad.json';
  build(tutorial, output);

}
