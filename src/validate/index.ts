import {red, yellow} from 'chalk';
import validatePackageJson from './packageJson';
import getPackageJson from '../packageJson/get';

export default function validate(): boolean {
  const pj = getPackageJson(process.cwd());
  if (!pj) {
    console.log(red('Error: No package.json.'));
    return false;
  }
  const validation = validatePackageJson(pj);
  // log warnings
  getValidationMessages(validation.warnings, yellow);
  // log and return errors
  return getValidationMessages(validation.errors, red);
}

function getValidationMessages(validation: PJErrors[], color: any) {
  if (validation && validation.length) {
    validation.forEach((e) => {
      console.log(color(`
        Error: ${e.name} ${e.msg}.
        Example: ${e.example}
      `));
    });
    return false;
  }
  return true;
}
