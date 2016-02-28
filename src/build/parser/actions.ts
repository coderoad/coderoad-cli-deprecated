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

function doAction(type: 'tests' | 'hints', isArray, actionValue, result, line, index) {
  // set to array
  if (result.chapters[index.chapter].pages[index.page].tasks[index.task][type] === undefined) {
    result.chapters[index.chapter].pages[index.page].tasks[index.task][type] = [];
  }
  if (!!isArray) {
    let valueList: string[] = actionValue.slice(1, -1).split(',');
    valueList.forEach((value) => {
      value = trimQuotes(value.trim(), true);
      result.chapters[index.chapter].pages[index.page].tasks[index.task][type].push(value);
    })
  } else {
    result.chapters[index.chapter].pages[index.page].tasks[index.task][type].push(actionValue);
  }
  return result;
}

export function addToTasks(result, line, index) {
  let match = Match.isAction(line);
  let action = match.action; // action|test|hint|answer
  let task = result.chapters[index.chapter].pages[index.page].tasks[index.task];
  let trimmedContent = line.slice(action.length + 2, line.length - 1); // content between brackets
  let actionValue: string = trimQuotes(trimmedContent);
  let isActionArray = Match.isArray(trimQuotes(actionValue));
  switch (action) {
    case 'test':
      result = doAction('tests', isActionArray, actionValue, result, line, index);
      break;
    case 'hint':
      result = doAction('hints', isActionArray, actionValue, result, line, index);
      break;
    case 'action':
      if (task.actions === undefined) {
        result.chapters[index.chapter].pages[index.page].tasks[index.task].actions = [];
      }
      if (!!isActionArray) {
        var arrayOfActions = JSON.parse(isActionArray);
        arrayOfActions.forEach(function(value) {
          value = trimCommandValue(trimQuotes(value.trim()));
          result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(value);
        });
      }
      else {
        let value = trimCommandValue(actionValue);
        result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(value);
      }
      return result;

    default:
      console.log('Invalid task action');
  }
  return result;
}
