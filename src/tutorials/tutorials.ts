// import {join} from 'path';
import {yellow} from 'chalk';
// import {fileExists} from '../tools/file';
// import {readFileSync} from 'fs';

export default function tutorials(): void {
  console.log(`List of tutorial packages in this directory...\n`);
  console.log(yellow('This feature is not yet implemented'));
  // getTutorials();
}

// function loadRootPackageJson(): PackageJson {
//   let pathToPackageJson = join(process.cwd(), './package.json');
//   if (fileExists(pathToPackageJson)) {
//     return JSON.parse(readFileSync(pathToPackageJson, 'utf8'));
//   } else {
//     console.log('no package.json file available. Try typing "npm init" in terminal');
//     process.exit(1);
//   }
// }

// function isTutorial(name: string): boolean {
//   let pathToTutorialPackageJson = join(process.cwd(), 'node_modules', name, 'package.json');
//   if (fileExists(pathToTutorialPackageJson)) {
//     // has package.json
//     let packageJson = JSON.parse(readFileSync(pathToTutorialPackageJson, 'utf8'));
//     // main path to coderoad.json
//     if (packageJson.main && packageJson.main.match(/coderoad.json$/)) {
//       let pathToCoderoadJson = join(process.cwd(), 'node_modules', name, packageJson.main);
//       // coderoad.json file exists
//       if (fileExists(pathToCoderoadJson)) {
//         return true;
//       }
//     }
//   }
//   return false;
// }
//
// function searchForTutorials(location): string[] {
//   if (!!location) {
//     return Object.keys(location)
//       .filter((name) => isTutorial(name));
//   } else {
//     return [];
//   }
// }

// function getTutorials(): void {
//   let packageJson: PackageJson = loadRootPackageJson();
//   let tutorials: string[] = []
//     .concat(searchForTutorials(packageJson.dependencies))
//     .concat(searchForTutorials(packageJson.devDependencies));
//   if (tutorials.length) {
//     console.log('Available tutorials: ');
//     tutorials.forEach((tutorial: string) => {
//       console.log('  - ' + tutorial);
//     });
//   }
//   console.log('No tutorials available');
// }
