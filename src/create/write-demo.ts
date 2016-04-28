import {readFileSync, writeFileSync, mkdirSync} from 'fs';
import {join} from 'path';
import {fileExists} from '../tools/file';

function createFile(pathToFile: string): void {
  if (!fileExists(pathToFile)) {
    let inputPath: string = join(__dirname, '..', '..', 'setup', pathToFile);
    let test = readFileSync(inputPath, 'utf8');
    writeFileSync(pathToFile, test, 'utf8');
  }
}

function createFolder(pathToFolder: string): void {
  if (!fileExists(pathToFolder)) {
    mkdirSync(pathToFolder);
  }
}

export function createTutorialMd(): void {
  createFolder('tutorial');
  createFile(join('tutorial', 'tutorial.md'));
  createFolder(join('tutorial', '1'));
  createFolder(join('tutorial', '1', '01'));
  createFile(join('tutorial', '1', '01', 'page-one.md'));
  createFolder(join('tutorial', '1', '02'));
  createFile(join('tutorial', '1', '02', 'page-two.md'));
  createFolder(join('tutorial', 'common'));
  createFile(join('tutorial', 'common', 'loadJS.js'));
}

export function createPackageJson(name: string): void {
  if (!fileExists('package.json')) {
    let inputPath: string = join(__dirname, '..', '..', 'setup', 'package.json');
    let packageJson: PackageJson = JSON.parse(readFileSync(inputPath, 'utf8'));
    packageJson.name = 'coderoad-' + name;
    let packageJsonString: string = JSON.stringify(packageJson, null, 2);
    writeFileSync('package.json', packageJsonString, 'utf8');
  }
}

export function createTestFiles(): void {
  createFile(join('tutorial', '1', '01', '01.spec.js'));
  createFile(join('tutorial', '1', '01', '02.spec.js'));
  createFile(join('tutorial', '1', '02', '01.spec.js'));
  createFile(join('tutorial', '1', '02', '02.spec.js'));
}
