import * as Match from './match';
import {chapter} from './chapter';
import {task} from './task';
import {loadImport} from './import';
import {bracketTracker} from './cleanup';

export function page(result: CR.Output, lines: string[], index: CR.Index): CR.Output {
  let hasBreak: number = null;
  index.page += 1;
  index.task = -1;
  result.chapters[index.chapter].pages.push({
    title: Match.page(lines[0]).trim(),
    description: ''
  });
  let inCodeBlock = false;
  let currentContinue = null;
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

      // ``` `
      case !!Match.codeBlock(line):
        if (line.length > 3) {
          result.chapters[index.chapter].pages[index.page].description += '\n' + line;
          continue;
        }
        inCodeBlock = !inCodeBlock;
      case inCodeBlock:
        continue;

      // @continue
      case !!Match.isContinue(line) || !!currentContinue:
        currentContinue = currentContinue ? currentContinue += line : line;
        bracketCount = bracketTracker(line);
        if (bracketCount === 0) {
          // if continue()
          result.chapters[index.chapter].pages[index.page].continue = currentContinue;
          currentContinue = null;
        }
        console.log(line);
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
