import {readFileSync, writeFileSync, mkdirSync} from 'fs';
import {join} from 'path';
import {fileExists} from '../tools/file';

function createFile(pathToFile: string): void {
  if (!fileExists(pathToFile)) {
    let inputPath = join(__dirname, '..', '..', 'setup', pathToFile);
    let test = readFileSync(inputPath, 'utf8');
    writeFileSync(pathToFile, test, 'utf8');
  }
}

function createFolder(pathToFolder: string): void {
  if (!fileExists(pathToFolder)) {
    mkdirSync(pathToFolder);
  }
}

const folders = [
  'tutorial',
  join('tutorial', '01'),
  join('tutorial', '02')
];

const files = [
  '.gitignore',
  join('tutorial', 'tutorial.md'),
  join('tutorial', '01', 'page-one.md'),
  join('tutorial', '01', '01.spec.js'),
  join('tutorial', '01', '02.spec.js'),
  join('tutorial', '02', 'page-two.md'),
  join('tutorial', '02', '01.spec.js'),
  join('tutorial', '02', '02.spec.js')
];

export function createTutorialMd(): void {
  return new Promise((resolve, reject) => {
    folders.forEach((folder) => createFolder(folder));
    files.forEach((file) => createFile(file));
    resolve();
  });
}

export function createPackageJson(name: string): void {
  return new Promise((resolve, reject) => {
    if (!fileExists('package.json')) {
      let inputPath: string = join(__dirname, '..', '..', 'setup', 'package.json');
      let packageJson: PackageJson = JSON.parse(readFileSync(inputPath, 'utf8'));
      packageJson.name = 'coderoad-' + name;
      let packageJsonString: string = JSON.stringify(packageJson, null, 2);
      writeFileSync('package.json', packageJsonString, 'utf8');
      resolve();
    } else {
      resolve();
    }
  });
}
