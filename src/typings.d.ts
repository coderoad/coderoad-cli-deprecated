
interface Index {
  chapter: number;
  page: number;
  task: number;
}

interface Result {
  project: Project;
  chapters: Chapter[];
}

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
  explanation: string;
  tasks: Task[];
}

interface Task {
  title: string;
  description: string;
  tests: string[];
  actions: string[];
}
