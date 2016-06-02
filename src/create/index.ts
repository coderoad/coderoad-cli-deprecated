import {validatePackageName} from './validate';
import {createPackageJson, createTutorialMd} from './write-demo';
// import {join} from 'path';
import {red, yellow} from 'chalk';
// import build from '../build';

export default function create(dir: string, name: string): boolean | Promise<boolean> {

  // npm package
  return Promise.all([
    validatePackageName(name),
    createPackageJson(dir, name),
    createTutorialMd(dir)
  ]).then(() => {
    // build(
    //   join(dir, 'tutorial/tutorial.md'),
    //   join(dir, 'coderoad.json')
    // );
    return true;
  }).catch((e) => {

    switch (e.type) {
      case 'error':
        console.log(red(e.msg));
        break;
      case 'warning':
        console.log(yellow(e.msg));
        break;
      default:
        console.log(e);
    }

    // fail
    return false;
  });
}
