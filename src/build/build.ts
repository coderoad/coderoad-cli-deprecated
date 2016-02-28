import * as fs from 'fs';
import * as process from 'process';
import * as validate from './validators';
import {project} from './parser/project';
import {createReadme} from './readme';
import {cleanup} from './parser/cleanup';

// function loadImport(result, index, line: string) {
//   let pathToFile = trimQuotes(Match.project(line));
//   console.log('import called', pathToFile);
//   let lines = fs.readFileSync(pathToFile, 'utf8').split('\n');
//   let resultImport = chapter(result, lines, index);
//   console.log(resultImport)
//   return result;
// }

function build(lines: string[]) {
  let result = {
    project: {},
    chapters: []
  }
  let index = {
    chapter: -1,
    page: -1,
    task: -1
  };
  return project(result, lines, index);
}

export default function(filePath: string, output = './coderoad.json') {
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
