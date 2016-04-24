declare namespace CR {

  interface Info {
    title: string;
    description: string;
  }

  interface Chapter {
    title: string;
    description: string;
    pages: Page[];
  }

  interface Page {
    title: string;
    description: string;
    tasks?: Task[];
    onPageComplete?: string;
  }
  interface Task {
    description: string;
    tests?: string[];
    hints?: string[];
    actions?: string[];
  }

  interface Output {
    info: Info;
    chapters: Chapter[];
  }

  interface Index {
    chapter: number;
    page: number;
    task: number;
  }

  interface Config {
    dir?: string;
    testSuffix?: string;
    testRunner: string;
    edit?: boolean;
    testRunnerOptions?: Object;
  }

  type TaskAction = 'hint'|'test'|'action'|'onComplete';
  type OutputAction = 'hints'|'tests'|'actions'|'onComplete';
}
