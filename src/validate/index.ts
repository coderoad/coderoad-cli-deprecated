import {red, yellow} from 'chalk';
import validatePackageJson from './packageJson';
import validateCoderoadJson from './coderoadJson';
import getJson from '../utils/getJson';
import getValidationMessages from './validation-messages';

export default function validate(): boolean {

  const pj = getJson(process.cwd(), 'package.json');
  const cj = getJson(process.cwd(), 'coderoad.json');

  // no package.json or coderoad.json
  if (!pj || !cj) {
    if (!pj) {
      console.log(red('Error: No package.json.'));
    }
    if (!cj) {
      console.log(red('Error: No coderoad.json.'));
    }
    // end early
    return false;
  }

  const pjValidation = validatePackageJson(pj);
  const cjValidation = validateCoderoadJson(cj);

  // log warnings & errors
  if (pjValidation.errors.length || pjValidation.warnings.length) {
    console.log(`         package.json issues:`);
    getValidationMessages('Warning', pjValidation.warnings, yellow);
    getValidationMessages('Error', pjValidation.errors, red);
  }
  if (cjValidation.errors.length || cjValidation.warnings.length) {
    console.log(`         coderoad.json issues:`);
    getValidationMessages('Warning', cjValidation.warnings, yellow);
    getValidationMessages('Error', cjValidation.errors, red);
  }
  return pjValidation.errors.length === 0 && cjValidation.errors.length === 0;
}
