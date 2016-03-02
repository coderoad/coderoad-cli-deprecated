import {trimQuotes, trimLeadingSpaces} from './cleanup';
import * as Match from './match';

export function trimCommandValue(text: string): string {
  let value = text.substring(text.indexOf('(') + 1).slice(0, -1);
  let command = {
    action: text.substring(0, text.indexOf('(')),
    value: trimLeadingSpaces(trimQuotes(value))
  };
  return command.action + '(\'' + command.value + '\')';
}

function doAction(type: CR.OutputAction, isArray, actionValue, result, line, index) {
  // set to array
  if (result.chapters[index.chapter].pages[index.page].tasks[index.task][type] === undefined) {
    result.chapters[index.chapter].pages[index.page].tasks[index.task][type] = [];
  }
  if (!!isArray) {
    let valueList: string[] = actionValue.slice(1, -1).split(',');
    valueList.forEach((value) => {
      value = trimQuotes(value.trim(), true);
      result.chapters[index.chapter].pages[index.page].tasks[index.task][type].push(value);
    });
  } else {
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
