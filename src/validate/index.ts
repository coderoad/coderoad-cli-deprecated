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
  getValidationMessages('Warning', validation.warnings, yellow);
  // log and return errors
  return getValidationMessages('Error', validation.errors, red);
}

function getValidationMessages(title: string, validation: PJErrors[], color: any) {
  if (validation && validation.length) {
    validation.forEach((e, index) => {
      console.log(
        color(`${index + 1}. ${title}: "${e.name}" ${e.msg}.
        Example: ${e.example}
`));
    });
    return false;
  }
  return true;
}
