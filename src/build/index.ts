import {readFileSync, writeFileSync}  from 'fs';
import * as validate from './validators';
import {info} from './parser/info';
import {createReadme} from './readme';
import {cleanup} from './parser/cleanup';

function parseAndBuild(lines: string[]): CR.Output {
  // coderoad.json outline
  const result: CR.Output = {
    info: {
      title: '',
      description: '',
    },
    pages: []
  };
  const index: CR.Index = {
    page: -1,
    task: -1,
  };
  return info(result, lines, index);
}

export default function build(filePath: string, output = './coderoad.json'): boolean {

  // validate path name
  if (!validate.filePath(filePath)) { return false; }

  // read tutorial.md
  const lines: string[] = readFileSync(filePath, 'utf8').split('\n');

  // build coeroad.json
  const result = cleanup(parseAndBuild(lines));

  // error parsing or building coderoad.json
  if (!result) { return false; }

  if (validate.result(result)) {
    // Safe to Write coderoad.json
    writeFileSync(output, result, 'utf8');
  }

  // check error creating readme
  if (!createReadme()) { return false; }

  return true;
}
