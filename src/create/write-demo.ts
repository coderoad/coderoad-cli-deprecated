import * as fs from 'fs';
import * as path from 'path';
import * as prompt from 'prompt';
import {fileExists} from '../tools/file';

function createFile(pathToFile: string) {
  if (!fileExists(pathToFile)) {
    let inputPath = path.join(__dirname, 'setup', pathToFile);
    let test = fs.readFileSync(inputPath, 'utf8');
    fs.writeFileSync(pathToFile, test, 'utf8');
  }
}

function createFolder(pathToFolder: string) {
  if (!fileExists(pathToFolder)) {
    fs.mkdirSync(pathToFolder);
  }
}

export function createTutorialMd() {
  createFolder('tutorial');
  createFile('tutorial/tutorial.md');
  createFolder('tutorial/1');
  createFolder('tutorial/1/01');
  createFile('tutorial/1/01/page-one.md');
  createFolder('tutorial/1/02');
  createFile('tutorial/1/02/page-two.md');
}

export function createPackageJson(name: string) {
  if (!fileExists('package.json')) {
    let inputPath = path.join(__dirname, './setup/package.json');
    let packageJson = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    packageJson.name = 'coderoad-' + name
    let packageJsonString = JSON.stringify(packageJson, null, 2);
    fs.writeFileSync('package.json', packageJsonString, 'utf8');
  }
}

export function createTestFiles() {
  createFile('tutorial/1/01/01.spec.js');
  createFile('tutorial/1/01/02.spec.js');
  createFile('tutorial/1/02/01.spec.js');
  createFile('tutorial/1/02/02.spec.js');
}
