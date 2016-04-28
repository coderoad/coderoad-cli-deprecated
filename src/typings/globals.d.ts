declare var program: {
  build: any;
  create: any;
  docs: any;
  list: any;
  publish: any;
  run: any;
  search: any;
};

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
