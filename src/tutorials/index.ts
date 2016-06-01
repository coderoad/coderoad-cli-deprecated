import {red} from 'chalk';
import findTutorials from './find-tutorials';
import getPackageJson from '../packageJson/get';

export default function tutorials(dir: string): string[] {
  const pj: PackageJson = getPackageJson(dir);

  if (!pj) {
    console.log(red(`No package.json available`));
    return null;
  }

  return ([]
    .concat(findTutorials(dir, pj.dependencies))
    .concat(findTutorials(dir, pj.devDependencies))
  );
}
