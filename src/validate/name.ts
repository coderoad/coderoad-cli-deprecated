import * as validateNpm from 'validate-npm-package-name';

export default function validateName(name: string): boolean {
  let validated: Validated = validateNpm(name);
  if (!validated.validForNewPackages || !validated.validForOldPackages) {
    return false;
  }
}
