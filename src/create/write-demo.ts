import * as fs from 'fs';
import * as path from 'path';
import * as prompt from 'prompt';
import {fileExists} from '../tools/file';

function createFile(pathToFile: string): void {
  if (!fileExists(pathToFile)) {
    let inputPath = path.join(__dirname, '..', '..', 'setup', pathToFile);
    let test = fs.readFileSync(inputPath, 'utf8');
    fs.writeFileSync(pathToFile, test, 'utf8');
  }
}

function createFolder(pathToFolder: string): void {
  if (!fileExists(pathToFolder)) {
    fs.mkdirSync(pathToFolder);
  }
}

export function createTutorialMd(): void {
  createFolder('tutorial');
  createFile(path.join('tutorial', 'tutorial.md'));
  createFolder(path.join('tutorial', '1'));
  createFolder(path.join('tutorial', '1', '01'));
  createFile(path.join('tutorial', '1', '01', 'page-one.md'));
  createFolder(path.join('tutorial', '1', '02'));
  createFile(path.join('tutorial', '1', '02', 'page-two.md'));
  createFolder(path.join('tutorial', 'common'));
  createFile(path.join('tutorial', 'common', 'loadJS.js'));
}

export function createPackageJson(name: string): void {
  if (!fileExists('package.json')) {
    let inputPath = path.join(__dirname, '..', '..', 'setup', 'package.json');
    let packageJson = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    packageJson.name = 'coderoad-' + name
    let packageJsonString = JSON.stringify(packageJson, null, 2);
    fs.writeFileSync('package.json', packageJsonString, 'utf8');
  }
}

export function createTestFiles():void {
  createFile(path.join('tutorial', '1', '01', '01.spec.js'));
  createFile(path.join('tutorial', '1', '01', '02.spec.js'));
  createFile(path.join('tutorial', '1', '02', '01.spec.js'));
  createFile(path.join('tutorial', '1', '02', '02.spec.js'));
}
