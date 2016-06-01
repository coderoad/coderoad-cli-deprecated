import {yellow, red} from 'chalk';
import findTutorials from './find-tutorials';
import getPackageJson from '../packageJson/get';

export default function tutorials(): string[] | boolean {
  // console.log(yellow('This feature is not yet implemented'));

  const pj: PackageJson = getPackageJson();

  if (!pj) {
    console.log(red(`No package.json available`))
    return false;
  }

  return ([]
    .concat(findTutorials(process.cwd(), pj.dependencies))
    .concat(findTutorials(process.cwd(), pj.devDependencies))
  );
}
