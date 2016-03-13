import * as chalk from 'chalk';
import {isValidJSON, hasProjectInfo, hasPage, lintOutput} from './lint';

export function filePath(filePath: string): void {
  if (!filePath) {
    console.log(chalk.red(`
    Pass in a path to your .md file
    > coderoad build "./src/tutorial.md"
    `));
    process.exit(1); // fail
  }
  // regex .md
}

export function result(text: string): boolean {
  isValidJSON(text);

  let jsonObject = JSON.parse(text);
  hasProjectInfo(jsonObject);
  hasPage(jsonObject);
  lintOutput(jsonObject);
  return true;
}
