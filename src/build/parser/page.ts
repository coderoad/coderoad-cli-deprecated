import * as Match from './match';
import {chapter} from './chapter';
import {task} from './task';
import {loadImport} from './import';
import {bracketTracker, trimValue} from './cleanup';

export function page(result: CR.Output, lines: string[], index: CR.Index): CR.Output {
  index.page += 1;
  index.task = -1;
  result.chapters[index.chapter].pages.push({
    title: Match.page(lines[0]).trim(),
    description: ''
  });
  let inCodeBlock = false;
  let currentComplete = null;
  let bracketCount = 0;

  let i = 0;
  while (i < lines.length - 1) {
    i += 1;
    let line = lines[i];

    switch (true) {

      // @import
      case !!Match.isImport(line):
        lines = loadImport(lines, Match.isImport(line));
        continue;

      // @onComplete
      case (!!Match.isComplete(line) || !!currentComplete):
        currentComplete = !!currentComplete ? currentComplete += '\n' + line : Match.isComplete(line);
        bracketCount = bracketTracker(currentComplete);
        // complete
        if (bracketCount === 0) {
          result.chapters[index.chapter].pages[index.page].onComplete = trimValue(currentComplete);
          currentComplete = null;
        }
        continue;

      // ``` `
      case !!Match.codeBlock(line):
        if (line.length > 3) {
          result.chapters[index.chapter].pages[index.page].description += '\n' + line;
        } else {
          inCodeBlock = !inCodeBlock;
        }
        continue;
      case inCodeBlock:
        continue;


      // ##
      case !!Match.chapter(line):
        return chapter(result, lines.slice(i), index);

      // ###
      case !!Match.page(line):
        return page(result, lines.slice(i), index);

      // +
      case !!Match.task(line):
        if (result.chapters[index.chapter].pages[index.page].tasks === undefined) {
          result.chapters[index.chapter].pages[index.page].tasks = [];
        }
        return task(result, lines.slice(i), index);

      // description
      default:
        if (i > 1) {
          result.chapters[index.chapter].pages[index.page].description += '\n';
        }
        result.chapters[index.chapter].pages[index.page].description += line;
        continue;
    }
  }
  return result;
}
