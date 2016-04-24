import * as chalk from 'chalk';
import * as validateNpm from 'validate-npm-package-name';
const _ = require('lodash');

export function validatePackageName(name: string): void {
  let validated: Validated = validateNpm(name);
  if (!validated.validForNewPackages || !validated.validForOldPackages) {
    if (validated.errors) {
      validated.errors.forEach((error) => {
        console.log(chalk.red('Package ' + error));
      });
    }
    if (validated.warnings) {
      validated.warnings.forEach((warning) => {
        console.log(chalk.yellow('Package ' + warning));
      });
    }
    if (!validated.errors && !validated.warnings) {
      console.log(chalk.red(`
        Invalid package name. Try using kebab-case.
        > coderoad create ${_.kebabCase(name) }
      `));
    }
    process.exit(1);
  }
}
