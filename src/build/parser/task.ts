import * as Match from './match';
import { page } from './page';
import { addToTasks } from './actions';
import { trimLeadingSpaces, bracketTracker, trimValue } from './cleanup';
import { loadImport } from './import';

export function task({
  dir, result, lines, index
}) {
  result.pages[index.page].tasks.push({
    description: trimLeadingSpaces(Match.task(lines[0]))
  });
  index.task += 1;
  let inCodeBlock = false;
  let currentPageComplete = null;
  let currentAction = null;
  let bracketCount = 0;

  let i = 0;
  while (i < lines.length - 1) {
    i += 1;
    let line: string = lines[i];

    switch (true) {

      // @import
      case !!Match.isImport(line):
        lines = loadImport({dir, lines, pathToMd: Match.isImport(line)});
        continue;

      // @onComplete
      case (!!Match.isPageComplete(line) || !!currentPageComplete):
        currentPageComplete = !!currentPageComplete
          ? currentPageComplete += '\n' + line
          : Match.isPageComplete(line);
        bracketCount = bracketTracker(currentPageComplete);
        // complete
        if (bracketCount === 0) {
          result.pages[index.page].onPageComplete = trimValue(currentPageComplete);
          currentPageComplete = null;
        }
        continue;

      // @action multiline
      case !!currentAction:
        if (line.length === 0) {
          currentAction += '\n';
        } else if ((bracketTracker(line) + bracketCount) !== 0) {
          // multi-line action in progress
          currentAction += line + '\n';
          bracketCount += bracketTracker(line);
        } else {
          // multi-line action finished
          currentAction += line;
          result = addToTasks({ result, line: currentAction, index });
          currentAction = null;
          bracketCount = 0;
        }
        continue;

      // @action codeblock
      case !Match.isAction(line) && !!Match.codeBlock(line):
        if (line.length > 3) {
          if (i > 0) {
            result.pages[index.page].tasks[index.task].description += '\n';
          }
          result.pages[index.page].tasks[index.task].description += line;
        } else {
          inCodeBlock = !inCodeBlock;
        }
        continue;


      // @action
      case !!Match.isAction(line):
        currentAction = line;
        bracketCount = bracketTracker(line);
        // TODO: bracket has completed bracket
        if (bracketCount === 0) {
          // if action complete, call addToTasks with merged lines
          result = addToTasks({ result, line: currentAction, index });
          currentAction = null;
        }
        continue;

      // +
      case !!Match.task(line):
        return task({dir, result, lines: lines.slice(i), index});

      // ##
      case !!Match.page(line):
        return page({dir, result, lines: lines.slice(i), index});


      // description
      default:
        if (i > 0) {
          result.pages[index.page].tasks[index.task].description += '\n';
        }
        result.pages[index.page].tasks[index.task].description += line;
    }
  }
  return result;
}
