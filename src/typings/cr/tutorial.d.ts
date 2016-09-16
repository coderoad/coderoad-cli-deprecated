declare namespace Tutorial {
  interface Info {
    name: string;
    version: string;
    latest?: string;
    isLatest: boolean;
    description?: string;
    keywords?: string[];
  }

  interface Config {
    language: string;
    dir: string;
    runner: string;
    runnerOptions?: Object;
    run: any;
    testSuffix?: string;
    issuesPath?: string;
    repo?: string;
    edit?: boolean;
  }

  interface PJ {
    name: string;
    repository?: Object;
    bugs?: Object;
    config: {
      language: string;
      runner: string;
      runnerOptions: RunnerOptions;
    };
    engines: Object;
    keywords: string[];
    files: string[];
    main: string;
    description: string;
    version: string;
    author?: string;
    authors?: string;
    dependencies?: Object;
    devDependencies?: Object;
    peerDependencies?: Object;
    license?: string;
    contributers?: string[];
  }

  interface RunnerOptions { }

}
