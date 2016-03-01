declare namespace CR {

  interface Project {
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
    explanation?: string;
    tasks?: Task[];
  }
  interface Task {
    description: string;
    tests?: string[];
    hints?: string[];
    actions?: string[];
    continue?: string;
  }

  interface Output {
    project: Project;
    chapters: Chapter[];
  }

  interface Index {
    chapter: number;
    page: number;
    task: number;
  }

  interface Config {
    testDir?: string;
    testSuffix?: string;
    testRunner: string;
    edit?: boolean;
    testRunnerOptions?: Object;
  }

  type TaskAction = 'hint'|'test'|'action'|'continue';
  type OutputAction = 'hints'|'tests'|'actions'|'continue';
}
