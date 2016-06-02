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

const folders = dir => [
  join(dir, 'tutorial'),
  join(dir, 'tutorial', '01'),
  join(dir, 'tutorial', '02')
];

const files = [
  join('.gitignore'),
  join('tutorial', 'tutorial.md'),
  join('tutorial', '01', 'page-one.md'),
  join('tutorial', '01', '01.spec.js'),
  join('tutorial', '01', '02.spec.js'),
  join('tutorial', '02', 'page-two.md'),
  join('tutorial', '02', '01.spec.js'),
  join('tutorial', '02', '02.spec.js')
];

export function createTutorialMd(dir: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    folders(dir).forEach((folder) => createFolder(folder));
    files.forEach((file) => createFile(dir, file));
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
