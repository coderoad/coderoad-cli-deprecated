import * as chalk from 'chalk';
import {isValidJSON, hasTutorialInfo, hasPage, lintOutput} from './lint';

export function filePath(filePath: string): boolean {
  if (!filePath) {
    console.log(chalk.red(`
    Pass in a path to your .md file
    > coderoad build "./src/tutorial.md"
    `));
    return false; // fail
  }
  // regex .md
  return true;
}

export function result(text: string): boolean {

  if (!isValidJSON(text)) { return false; }

  const jsonObject = JSON.parse(text);

  // run tests
  return [
    hasTutorialInfo(jsonObject),
    hasPage(jsonObject),
    lintOutput(jsonObject)
  ].every(x => !!x);
}
