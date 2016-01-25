
interface Index {
  chapter: number;
  page: number;
}

interface Result {
  project: Object;
  chapters: Chapter[];
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
}
