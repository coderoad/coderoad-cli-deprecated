declare namespace CR {

  interface Output {
    info: Info;
    chapters: Chapter[];
  }

  type OutputAction = string;

  interface Index {
    chapter: number;
    page: number;
    task: number;
  }

  interface Info {
    title: string;
    description: string;
  }

  interface Chapter extends Info {
    pages: Page[];
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
    chapter: number;
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
