import {trimQuotes, trimCommandValue, trimArray} from './cleanup';
import {isAction, isArray} from './match';

function doAction({
  type, isArray, actionValue, result, page, task
}): CR.Output {
  // set to array
  if (result.pages[page].tasks[task][type] === undefined) {
    result.pages[page].tasks[task][type] = [];
  }
  let current = new Set(result.pages[page].tasks[task][type]);
  if (!!isArray) {
    // array
    let values = trimArray(actionValue);
    values.forEach((v) => {
      current.add(v);
    });
  } else {
    // string
    current.add(actionValue);
  }
  result.pages[page].tasks[task][type] = Array.from(current);
  return result;
}

export function addToTasks({ result, line, index: {page, task} }) {
  let action: CR.TaskAction | string = isAction(line);  // 'action'|'test'|'hint'|'openConsole'
  let currentTask: CR.Task = result.pages[page].tasks[task];
  let trimmedContent: string = line.slice(action.length + 2, line.length - 1); // content between brackets
  let actionValue: string = trimQuotes(trimmedContent);
  let isActionArray = isArray(trimQuotes(actionValue));
  switch (action) {
    case 'test':
      result = doAction({
        type: 'tests',
        isArray: isActionArray,
        actionValue,
        result,
        page,
        task,
      });
      break;
    case 'hint':
      result = doAction({
        type: 'hints',
        isArray: isActionArray,
        actionValue,
        result,
        page,
        task,
      });
      break;
    case 'continue':
      break;
    case 'action':
      if (currentTask.actions === undefined) {
        result.pages[page].tasks[task].actions = [];
      }
      if (!!isActionArray) {
        var arrayOfActions: string[] = JSON.parse(isActionArray);
        arrayOfActions.forEach((v) => {
          let value = trimCommandValue(trimQuotes(v.trim()));
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
