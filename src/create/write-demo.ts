import {readFileSync, writeFileSync, mkdirSync} from 'fs';
import {join} from 'path';
import {sortPackageJson} from 'sort-package-json'
import fileExists from 'node-file-exists';

function createFile(dir: string, pathToFile: string): void {
  try {
    if (!fileExists(pathToFile)) {
      let inputPath = join(__dirname, '..', '..', 'setup', pathToFile);
      let test = readFileSync(inputPath, 'utf8');
      writeFileSync(join(dir, pathToFile), test, 'utf8');
    }
  } catch (e) {
    console.log(e);
  }
}

function createFolder(pathToFolder: string): void {
  try {
    if (!fileExists(pathToFolder)) {
      mkdirSync(pathToFolder);
    }
  } catch (e) {
    console.log(e);
  }
}

const tutorialFolders = dir => [
  join(dir, 'tutorial'),
  join(dir, 'tutorial', '01'),
  join(dir, 'tutorial', '02')
];

const tutorialDemo = [
  join('tutorial', 'tutorial.md'),
  join('tutorial', '01', 'index.md'),
  join('tutorial', '01', '01.js'),
  join('tutorial', '01', '02.js'),
  join('tutorial', '02', 'index.md'),
  join('tutorial', '02', '01.js'),
  join('tutorial', '02', '02.js')
];

export function createTutorialMd(dir: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    createFile(dir, '.gitignore');
    if (!fileExists(join(dir, 'tutorial'))) {
      tutorialFolders(dir).forEach((folder) => createFolder(folder));
      tutorialDemo.forEach((file) => createFile(dir, file));
    }
    resolve(true);
  });
}

export function createPackageJson(dir: string, name: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!fileExists(join(dir, 'package.json'))) {

      // read from existing package.json
      const inputPath: string = join(
        __dirname, '..', '..', 'setup', 'package.json'
      );

      const packageJson: PackageJson = JSON.parse(
        readFileSync(inputPath, 'utf8')
      );
      packageJson.name = 'coderoad-' + name;

      // sort package.json keys
      const packageJsonString: string = sortPackageJson(
        JSON.stringify(packageJson, null, 2)
      );

      writeFileSync(join(dir, 'package.json'), packageJsonString, 'utf8');
      resolve(true);
    } else {
      // TODO: validate package.json

      // already created
      resolve(true);
    }
  });
}
