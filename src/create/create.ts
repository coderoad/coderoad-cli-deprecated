import * as fs from 'fs';
import {validatePackageName} from './validate';
import {createPackageJson, createTutorialMd, createTestFiles} from './write-demo';
import {createReadme} from '../build/readme';

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
  // readme with install instructions and overview
  createReadme();

}
