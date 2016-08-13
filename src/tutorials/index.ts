import {red} from 'chalk';
import findTutorials from './find-tutorials';
import getJson from '../utils/getJson';

export default function tutorials({ dir }): string[] {
  const pj: PackageJson = getJson(dir, 'package.json');

  if (!pj) {
    console.log(red(`No package.json available`));
    return null;
  }

  let removeDups = {};

  return ([]
    .concat(findTutorials(dir, pj.dependencies))
    .concat(findTutorials(dir, pj.devDependencies))
    .filter((tutorial) => {
      if (!removeDups.hasOwnProperty(tutorial.name) && removeDups[tutorial.name] !== tutorial.version) {
        removeDups[tutorial.name] = tutorial.version;
        return true;
      }
      return false;
    })
  );
}
