import * as chalk from 'chalk';

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
  return true;
}

function isValidJSON(text: string): void {
  if (!/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    console.log(chalk.red(`
      Something went wrong. There seems to be an error in ${filePath}.
      `));
    process.exit(1); // fail
  }
}

function hasProjectInfo(json: CR.Output): void {
  let validTitle = json.project.title.length > 0,
    validDescription = json.project.description.length > 0;
  if (!(validTitle && validDescription)) {
    console.log(chalk.red(`
      Your tutorial is missing basic project information. Check the project title & description.
      `));
    process.exit(1); // fail
  }
}

function hasPage(json: CR.Output): void {
  if (!(json.chapters[0].pages.length > 0 && !!json.chapters[0].pages[0].title)) {
    console.log(chalk.red(`
      Your tutorial requires at least one page.
      `));
    process.exit(1); // fail
  }
}
