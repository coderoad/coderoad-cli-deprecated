import * as validateNpm from 'validate-npm-package-name';
import kebabCase from 'lodash.kebabcase';

export function validatePackageName(name: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    let validated: Validated = validateNpm(name);
    if (!validated.validForNewPackages || !validated.validForOldPackages) {
      if (validated.errors) {
        validated.errors.forEach((error) => {
          throw {
            type: 'error',
            msg: '\nPackage ' + error,
          };
        });
      }
      if (validated.warnings) {
        validated.warnings.forEach((warning) => {
          throw {
            type: 'warning',
            msg: '\nPackage ' + warning,
          };
        });
      }
      if (!validated.errors && !validated.warnings) {
        throw {
          type: 'error',
          msg: `\nInvalid package name. Try using kebab-case.
        > coderoad create ${kebabCase(name)}\n`
        };
      }
    }
    resolve(true);
  });
}
