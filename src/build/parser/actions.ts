import {trimQuotes, trimCommandValue, trimArray} from './cleanup';
import * as Match from './match';

function doAction(type: CR.OutputAction, isArray, actionValue, result, line, index): CR.Output {
  // set to array
  if (result.chapters[index.chapter].pages[index.page].tasks[index.task][type] === undefined) {
    result.chapters[index.chapter].pages[index.page].tasks[index.task][type] = [];
  }
  if (!!isArray) {
    // array
    let values = trimArray(actionValue);
    values.forEach((value) => {
      result.chapters[index.chapter].pages[index.page].tasks[index.task][type].push(value);
    });
  } else {
    // string
    result.chapters[index.chapter].pages[index.page].tasks[index.task][type].push(actionValue);
  }
  return result;
}

export function addToTasks(result, line, index) {
  let action: CR.TaskAction|string = Match.isAction(line);  // 'action'|'test'|'hint'|'continue'
  let task: CR.Task = result.chapters[index.chapter].pages[index.page].tasks[index.task];
  let trimmedContent: string = line.slice(action.length + 2, line.length - 1); // content between brackets
  let actionValue: string = trimQuotes(trimmedContent);
  let isActionArray = Match.isArray(trimQuotes(actionValue));
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
      if (task.actions === undefined) {
        result.chapters[index.chapter].pages[index.page].tasks[index.task].actions = [];
      }
      if (!!isActionArray) {
        var arrayOfActions: string[] = JSON.parse(isActionArray);
        arrayOfActions.forEach(function(value) {
          value = trimCommandValue(trimQuotes(value.trim()));
          result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(value);
        });
      } else {
        let value: string = trimCommandValue(actionValue);
        result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(value);
      }
      return result;

    default:
      console.log('Invalid task action');
  }
  return result;
}
