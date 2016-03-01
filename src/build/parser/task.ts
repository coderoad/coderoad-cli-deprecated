import * as Match from './match';
import {chapter} from './chapter';
import {page} from './page';
import {addToTasks} from './actions';
import {trimLeadingSpaces} from './cleanup';
import {loadImport} from './import';

function bracketTracker(line: string): number {
  let l = (line.match(/\(/g) || []).length;
  let r = (line.match(/\)/g) || []).length;
  return l - r;
}

export function task(result: CR.Output, lines: string[], index: CR.Index): CR.Output {
  result.chapters[index.chapter].pages[index.page].tasks.push({
    description: trimLeadingSpaces(Match.task(lines[0]))
  });
  index.task += 1;
  let inExpCodeBlock = false;
  let currentAction = null;
  let bracketCount = 0;

  let i = 0;
  while (i < lines.length - 1) {
    i += 1;

    let line: string = lines[i];
    // @import
    let importFile: string = Match.isImport(line);
    if (!!importFile) {
      lines = loadImport(lines, importFile);
    } else {

      // @action (multiline)
      if (!!currentAction) {
        if (line.length === 0) {
          currentAction += '\n';
        } else if ((bracketTracker(line) + bracketCount) !== 0) {
          // multi-line action in progress
          currentAction += line + '\n';
          bracketCount += bracketTracker(line);
        } else {
          // multi-line action finished
          currentAction += line;
          result = addToTasks(result, currentAction, index);
          currentAction = null;
          bracketCount = 0;
        }
        continue;
      }

      // not @action multiline

      let isAction: string = Match.isAction(line);
      // not in action, may be in Explanation code block
      if (!isAction && !!Match.codeBlock(line)) {
        if (line.length > 3) {
          result = addToDescription(i, result, line, index);
          continue;
        }
        inExpCodeBlock = !inExpCodeBlock;
      }

      if (!inExpCodeBlock) {

        // @action
        if (!!isAction) {
          currentAction = line;
          bracketCount = bracketTracker(line);
          // TODO: bracket has completed bracket
          if (bracketCount === 0) {
            // if action complete, call addToTasks with merged lines
            result = addToTasks(result, currentAction, index);
            currentAction = null;
          }
          // + Task
        } else if (!!Match.task(line)) {
          return task(result, lines.slice(i), index);
          // ### Page
        } else if (!!Match.page(line)) {
          return page(result, lines.slice(i), index);
          // ## Chapter
        } else if (!!Match.chapter(line)) {
          return chapter(result, lines.slice(i), index);
          // task description +
        } else {
          result = addToDescription(i, result, line, index);
        }
      }
    }
  }
  return result;
}

function addToDescription(i: number, result: CR.Output, line: string, index: CR.Index): CR.Output {
  if (i > 0) {
    result.chapters[index.chapter].pages[index.page].tasks[index.task].description += '\n';
  }
  result.chapters[index.chapter].pages[index.page].tasks[index.task].description += line;
  return result;
}
