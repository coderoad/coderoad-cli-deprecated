declare namespace CR {

  interface Output {
    info: Info;
    pages: Page[];
  }

  type OutputAction = string;

  interface Index {
    page: number;
    task: number;
  }

  interface Info {
    title: string;
    description: string;
  }

  interface Page extends Info {
    tasks?: Task[];
    onPageComplete?: string;
  }
  interface Task {
    description: string;
    tests?: string[];
    hints?: string[];
    actions?: string[];
  }
  type TaskAction = string;

  interface Position {
    page: number;
  }

  interface Config {
    dir: string;
    runner: string;
    runnerOptions?: Object;
    run: any;
    testSuffix?: string;
    issuesPath?: string;
    repo?: string;
    edit?: boolean;
  }

}
