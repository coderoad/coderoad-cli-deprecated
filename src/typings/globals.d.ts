interface PackageJson {
  name: string;
  version: string;
  dependencies: Object;
  devDependencies: Object;
  config: CR.Config;
}

interface Validated {
  validForNewPackages: boolean;
  validForOldPackages: boolean;
  errors: string[];
  warnings: string[];
}

declare module 'validate-npm-package-name' {
  export default function validateNpm(name: string): Validated;
}
