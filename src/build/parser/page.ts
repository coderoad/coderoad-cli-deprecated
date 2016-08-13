import * as Match from './match';
import {task} from './task';
import {loadImport} from './import';
import {bracketTracker, trimValue} from './cleanup';

export function page({ dir, result, lines, index }) {
  index.page += 1;
  index.task = -1;
  result.pages.push({
    title: Match.page(lines[0]),
    description: ''
  });
  let inCodeBlock = false;
  let currentPageComplete = null;
  let bracketCount = 0;

  let i = 0;
  while (i < lines.length - 1) {
    i += 1;
    let line = lines[i];

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

      // ``` `
      case !!Match.codeBlock(line):
        if (line.length > 3) {
          result.pages[index.page].description += '\n' + line;
        } else {
          inCodeBlock = !inCodeBlock;
        }
        continue;
      case inCodeBlock:
        continue;


      // ##
      case !!Match.page(line):
        return page({dir, result, lines: lines.slice(i), index});

      // +
      case !!Match.task(line):
        if (result.pages[index.page].tasks === undefined) {
          result.pages[index.page].tasks = [];
        }
        return task({dir, result, lines: lines.slice(i), index});

      // description
      default:
        if (i > 1) {
          result.pages[index.page].description += '\n';
        }
        result.pages[index.page].description += line;
        continue;
    }
  }
  return result;
}
