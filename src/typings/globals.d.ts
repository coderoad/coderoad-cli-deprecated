declare var program: {
  build: any;
  create: any;
  docs: any;
  list: any;
  publish: any;
  run: any;
  search: any;
}

interface PackageJson {
  name: string;
  version: string;
  dependencies: Object;
  devDependencies: Object;
  config: CR.Config;
}
