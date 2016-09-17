import {yellow, red} from 'chalk';

const validKeys = {
  info: ['title', 'description'],
  page: ['title', 'description', 'onPageComplete', 'tasks', 'video', 'resources'],
  task: ['description', 'tests', 'actions', 'hints']
};

export function lintOutput(json: CR.Output): boolean {
  let invalidKeys = [];
  let warningKeys = [];

  // project
  let prKeys = Object.keys(json.info);
  prKeys.forEach((key) => {
    if (validKeys.info.indexOf(key) < 0) {
      invalidKeys.push({
        error: `Invalid Project key "${key}"`,
        location: 'Project'
      });
    }
  });

  json.pages.forEach((page: CR.Page, pIndex: number) => {

    // page
    let pKeys = Object.keys(page);
    pKeys.forEach((key) => {
      if (validKeys.page.indexOf(key) < 0) {
        invalidKeys.push({
          error: `Invalid Page key "${key}"`,
          location: `page: ${pIndex + 1}`
        });
      }
    });

    if (page.tasks && page.tasks.length > 0) {
      page.tasks.forEach((task: CR.Task, tIndex: number) => {
        let tKeys = Object.keys(task);

        tKeys.forEach((key) => {
          if (validKeys.task.indexOf(key) < 0) {
            invalidKeys.push({
              error: `Invalid Task key "${key}"`,
              location: `page: ${pIndex + 1}, task: ${tIndex + 1}`
            });
          }
        });

        if (!task.tests || task.tests.length < 1) {
          invalidKeys.push({
            error: 'Missing Task Test',
            location: `page: ${pIndex + 1}, task: ${tIndex + 1}`
          });
        }
      });
    } else {
      warningKeys.push({
        warning: 'Missing page tasks',
        location: `page: ${pIndex + 1}`
      });
    }
  });


  if (warningKeys.length > 0) {
    warningKeys.forEach((w) => {
      console.log(yellow(`\nWarning: ${w.warning}: `, w.location));
    });
  }

  if (invalidKeys.length > 0) {
    invalidKeys.forEach((e) => {
      console.log(red(`\nError: ${e.error}: `, e.location));
    });
    return false;
  }
  return true;
}

export function isValidJSON(text: string): boolean {
  if (!/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    console.log(red('\nSomething went wrong. Build did not output valid JSON.'));
    return false;
  }
  return true;
}

export function hasTutorialInfo(json: CR.Output): boolean {
  let validTitle = json.info.title.length > 0,
    validDescription = json.info.description.length > 0;
  if (!(validTitle && validDescription)) {
    console.log(red('\nYour tutorial is missing basic project information. Check the project title & description.'));
    return false;
  }
  return true;
}

export function hasPage(json: CR.Output): boolean {
  if (!(json.pages.length > 0 && !!json.pages[0].title)) {
    console.log(red('\nYour tutorial requires at least one page.'));
    return false;
  }
  return true;
}
