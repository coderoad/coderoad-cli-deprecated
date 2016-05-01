import {red, yellow} from 'chalk';
import * as validateNpm from 'validate-npm-package-name';
const _ = require('lodash');

export function validatePackageName(name: string): void {
  let validated: Validated = validateNpm(name);
  if (!validated.validForNewPackages || !validated.validForOldPackages) {
    if (validated.errors) {
      validated.errors.forEach((error) => {
        console.log(red('\nPackage ' + error));
      });
    }
    if (validated.warnings) {
      validated.warnings.forEach((warning) => {
        console.log(yellow('\nPackage ' + warning));
      });
    }
    if (!validated.errors && !validated.warnings) {
      console.log(red(`
        Invalid package name. Try using kebab-case.
        > coderoad create ${_.kebabCase(name) }
      `));
    }
    process.exit(1);
  }
}
