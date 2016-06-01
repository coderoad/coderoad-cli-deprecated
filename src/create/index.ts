import {validatePackageName} from './validate';
import {createPackageJson, createTutorialMd} from './write-demo';
import {red, yellow} from 'chalk';
import build from '../build';

export default function create(name: string): boolean | Promise<boolean> {

  // npm package
  return Promise.all([
    validatePackageName(name),
    createPackageJson(name),
    createTutorialMd()
  ]).then(() => {
    build('tutorial/tutorial.md', 'coderoad.json');
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
