import {isString} from './validations';

const validKeys = {
  info: ['title', 'description'],
  page: ['title', 'description', 'onPageComplete', 'tasks', 'video', 'link'],
  task: ['description', 'tests', 'actions', 'hints'],
  actions: ['open', 'set', 'insert'],
};

const validateKeys = {
  info: [{
    name: 'title',
    validation: isString,
  }, {
    name: 'description',
    validation: isString,
  }],
  page: [{
    name: 'title',
    validation: isString,
  }, {
    name: 'description',
    validation: isString,
  }],
  task: [{
    name: 'description',
    validation: isString,
  }, {
    name: 'tests',
    validation: tests => Array.isArray(tests) && tests.length && tests.every(test => typeof test === 'string' && test.length),
  }]
};

export default function validateCoderoadJson(json: Object): ValidatePjOutput {
  const errors = [];
  const warnings = [];

  // test for invalid json
  try {
    JSON.parse(JSON.stringify(json));
  } catch (e) {
    errors.push({
      name: 'coderoad.json',
      msg: 'has an error.'
    });
    return {
      errors, warnings
    };
  }

  // info =>

  // check if info contains invalid keys
  const infoKeys = Object.keys(json.info);
  infoKeys.forEach(key => {
    if (!validKeys.info.includes(key)) {
      errors.push({
        name: `info.${key}`,
        msg: 'is not a valid key on info',
        location: `info.${key}`,
        example: `Did you mean: ${validKeys.info.join(', ')}`
      });
    }
  });
  validateKeys.info.forEach(key => {
    if (!key.validation(json.info[key.name])) {
      errors.push({
        name: `info.${key.name}`,
        msg: 'is not complete',
        example: `Expected a string, but got: ${json.info[key.name]}`,
      });
    }
  });


  // pages =>
  json.pages.forEach((page: CR.Page, pIndex: number) => {

    const pageKeys = Object.keys(page);
    pageKeys.forEach(key => {
      if (validKeys.page.indexOf(key) < 0) {
        errors.push({
          name: key,
          msg: 'is an invalid key',
          location: `pages[${pIndex}]`,
          example: json.pages[pIndex],
        });
      }
    });
    validateKeys.page.forEach(key => {
      if (!key.validation(page[key.name])) {
        errors.push({
          name: `pages[${pIndex}].${key.name}`,
          msg: 'is not complete',
          example: `Expected a string, but got: ${page[key.name]}`
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

        validateKeys.task.forEach(key => {
          if (!key.validation(task[key.name])) {
            errors.push({
              name: `pages[${pIndex}].tasks[${tIndex}].${key.name}`,
              msg: 'is not complete',
              example: `Expected a string, but got: ${page[key.name]}`
            });
          }
        });
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
