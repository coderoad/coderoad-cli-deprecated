// import {readFileSync} from 'fs';
// import {join} from 'path';
// import {red} from 'chalk';

// let settings = null;
//
// function getDir() {
//   try {
//     settings = JSON.parse(
//       readFileSync(
//         join(process.cwd(), 'package.json'), 'utf8'
//       )
//     );
//   } catch (e) {
//     console.log(red('No package.json config found in directory ', process.cwd(), e));
//   }
//   return settings.dir || 'tutorial';
// }


export const tutorialDir = 'tutorial';
