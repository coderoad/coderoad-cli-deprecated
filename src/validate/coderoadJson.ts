const validKeys = {
  info: ['title', 'description'],
  page: ['title', 'description', 'onPageComplete', 'tasks', 'video', 'link'],
  task: ['description', 'tests', 'actions', 'hints'],
  actions: ['open', 'set', 'insert'],
};


export default function validateCoderoadJson(json): ValidatePjOutput {
  const errors = [];
  const warnings = [];

  // test for invalid json
  try {
    json.parse(json);
  } catch (e) {
    errors.push({
      name: 'json',
      msg: 'is invalid'
    });
    return {
      errors, warnings
    };
  }

  // info => 
  const infoKeys = Object.keys(json.info);
  infoKeys.forEach((key) => {
    if (validKeys.info.indexOf(key) < 0) {
      errors.push({
        name: key,
        msg: 'is missing',
        location: `info.${key}`,
      });
    }
  });

  json.pages.forEach((page: CR.Page, pIndex: number) => {

    // pages =>
    const pageKeys = Object.keys(page);
    pageKeys.forEach((key) => {
      if (validKeys.page.indexOf(key) < 0) {
        errors.push({
          name: key,
          msg: 'is an invalid key',
          location: `pages[${pIndex}]`,
          example: json.pages[pIndex],
        });
      }
    });

    // pages => tasks
    if (page.tasks && page.tasks.length > 0) {
      page.tasks.forEach((task: CR.Task, tIndex: number) => {
        let taskKeys = Object.keys(task);

        taskKeys.forEach((key) => {
          if (validKeys.task.indexOf(key) < 0) {
            errors.push({
              name: 'page task',
              msg: `Invalid Task key "${key}"`,
              location: `pages[${pIndex}].tasks[]${tIndex}]`,
            });
          }
        });

        if (!task.tests || task.tests.length < 1) {
          errors.push({
            name: 'task test',
            msg: 'Missing Task Test',
            location: `pages[${pIndex}].tasks[${tIndex}]`,
          });
        }
      });
    } else {
      warnings.push({
        name: 'page tasks',
        msg: 'are missing',
        location: `pages[${pIndex}]`,
      });
    }
  });

  return {
    errors,
    warnings,
  };
}
