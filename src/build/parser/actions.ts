import {trimQuotes, trimCommandValue, trimArray} from './cleanup';
import {isAction, isArray} from './match';

// TODO: change to use new Set ()

function doAction(
  type: CR.OutputAction, isArray, actionValue, result, line,
  {page, task}
): CR.Output {
  // set to array
  if (result.pages[page].tasks[task][type] === undefined) {
    result.pages[page].tasks[task][type] = [];
  }
  let current = result.pages[page].tasks[task][type];
  if (!!isArray) {
    // array
    let values = trimArray(actionValue);
    values.forEach((value) => {
      if (current.indexOf(value) === -1 && values.indexOf(value) === -1) {
        result.pages[page].tasks[task][type].push(value);
      }
    });
  } else {
    // string
    if (current.indexOf(actionValue) === -1) {
      result.pages[page].tasks[task][type].push(actionValue);
    }
  }
  return result;
}

export function addToTasks(result, line, index) {
  let action: CR.TaskAction | string = isAction(line);  // 'action'|'test'|'hint'|'openConsole'
  const {page, task} = index;
  let currentTask: CR.Task = result.pages[page].tasks[task];
  let trimmedContent: string = line.slice(action.length + 2, line.length - 1); // content between brackets
  let actionValue: string = trimQuotes(trimmedContent);
  let isActionArray = isArray(trimQuotes(actionValue));
  switch (action) {
    case 'test':
      result = doAction('tests', isActionArray, actionValue, result, line, index);
      break;
    case 'hint':
      result = doAction('hints', isActionArray, actionValue, result, line, index);
      break;
    case 'continue':
      break;
    case 'action':
      if (currentTask.actions === undefined) {
        result.pages[page].tasks[task].actions = [];
      }
      if (!!isActionArray) {
        var arrayOfActions: string[] = JSON.parse(isActionArray);
        arrayOfActions.forEach(function(value) {
          value = trimCommandValue(trimQuotes(value.trim()));
          result.pages[page].tasks[task].actions.push(value);
        });
      } else {
        let value: string = trimCommandValue(actionValue);
        result.pages[page].tasks[task].actions.push(value);
      }
      return result;

    default:
      console.log('Invalid task action');
  }
  return result;
}
