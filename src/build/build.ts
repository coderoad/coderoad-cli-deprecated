import * as fs from 'fs';
import * as validate from './validators';
import {project} from './parser/project';
import {createReadme} from './readme';
import {cleanup} from './parser/cleanup';

function build(lines: string[]): CR.Output {
  let result = {
    project: {
      title: '',
      description: ''
    },
    chapters: []
  };
  let index = {
    chapter: -1,
    page: -1,
    task: -1
  };
  return project(result, lines, index);
}

export default function(filePath: string, output = './coderoad.json'): void {
  // VALIDATE: path name
  validate.filePath(filePath);

  // Read
  let lines: string[] = fs.readFileSync(filePath, 'utf8').split('\n');
  // Build
  let result = cleanup(build(lines));

  if (validate.result(result)) {
    // Safe to Write coderoad.json
    fs.writeFileSync(output, result, 'utf8');
  }
  createReadme();
}
