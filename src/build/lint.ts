import * as chalk from 'chalk';

const validKeys = {
  project: ['title', 'description'],
  chapter: ['title', 'description', 'pages'],
  page: ['title', 'description', 'onPageComplete', 'tasks', 'video', 'link'],
  task: ['description', 'tests', 'actions', 'hints']
};

export function lintOutput(json: CR.Output): void {
  let invalidKeys = [];
  let warningKeys = [];

  // project
  let prKeys = Object.keys(json.project);
  prKeys.forEach((key) => {
    if (validKeys.project.indexOf(key) < 0) {
      invalidKeys.push({ error: `Invalid Project key "${key}"`, location: 'Project' });
    }
  });

  json.chapters.forEach((chapter, cIndex) => {
    // chapter
    let chKeys = Object.keys(chapter);
    chKeys.forEach((key) => {
      if (validKeys.chapter.indexOf(key) < 0) {
        invalidKeys.push({ error: `Invalid Chapter key "${key}"`, location: `ch: ${cIndex + 1}` });
      }
    });

    if (chapter.pages && chapter.pages.length > 0) {
      chapter.pages.forEach((page, pIndex) => {
        // page
        let pKeys = Object.keys(page);
        pKeys.forEach((key) => {
          if (validKeys.page.indexOf(key) < 0) {
            invalidKeys.push({ error: `Invalid Page key "${key}"`, location: `ch: ${cIndex + 1}, page: ${pIndex + 1}` });
          }
        });

        if (page.tasks && page.tasks.length > 0) {
          page.tasks.forEach((task, tIndex) => {
            let tKeys = Object.keys(task);

            tKeys.forEach((key) => {
              if (validKeys.task.indexOf(key) < 0) {
                invalidKeys.push({ error: `Invalid Task key "${key}"`, location: `ch: ${cIndex + 1}, page: ${pIndex + 1}, task: ${tIndex + 1}` });
              }
            });

            if (!task.tests || task.tests.length < 1) {
              invalidKeys.push({ error: 'Missing Task Test', location: `ch: ${cIndex + 1}, page: ${pIndex + 1}, task: ${tIndex + 1}` });
            }
          });
        } else {
          warningKeys.push({ warning: 'Missing page tasks', location: `ch: ${cIndex + 1}, page: ${pIndex + 1}` });
        }
      });
    } else {
      warningKeys.push({ warning: 'Missing pages', location: `ch: ${cIndex + 1}` });
    }
  });


  if (warningKeys.length > 0) {
    warningKeys.forEach((w) => {
      console.log(chalk.yellow(`Warning: ${w.warning}: `, w.location));
    });
  }

  if (invalidKeys.length > 0) {
    invalidKeys.forEach((e) => {
      console.log(chalk.red(`Error: ${e.error}: `, e.location));
    });

    process.exit(1); // fail
  }
}

export function isValidJSON(text: string): void {
  if (!/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    console.log(chalk.red(`
      Something went wrong. Build did not output valid JSON.
      `));
    process.exit(1); // fail
  }
}

export function hasProjectInfo(json: CR.Output): void {
  let validTitle = json.project.title.length > 0,
    validDescription = json.project.description.length > 0;
  if (!(validTitle && validDescription)) {
    console.log(chalk.red(`
      Your tutorial is missing basic project information. Check the project title & description.
      `));
    process.exit(1); // fail
  }
}

export function hasPage(json: CR.Output): void {
  if (!(json.chapters[0].pages.length > 0 && !!json.chapters[0].pages[0].title)) {
    console.log(chalk.red(`
      Your tutorial requires at least one page.
      `));
    process.exit(1); // fail
  }
}
