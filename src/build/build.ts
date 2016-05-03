import {readFileSync, writeFileSync}  from 'fs';
import * as validate from './validators';
import {info} from './parser/info';
import {createReadme} from './readme';
import {cleanup} from './parser/cleanup';

function parseAndBuild(lines: string[]): CR.Output {
  let result: CR.Output = {
    info: {
      title: '',
      description: '',
    },
    pages: []
  };
  let index: CR.Index = {
    page: -1,
    task: -1,
  };
  return info(result, lines, index);
}

export default function build(filePath: string, output = './coderoad.json'): void {
  // VALIDATE: path name
  validate.filePath(filePath);

  // Read
  let lines: string[] = readFileSync(filePath, 'utf8').split('\n');
  // Build
  let result = cleanup(parseAndBuild(lines));

  if (validate.result(result)) {
    // Safe to Write coderoad.json
    writeFileSync(output, result, 'utf8');
  }
  createReadme();
}
