import * as Match from './match';
import {chapter} from './chapter';
import {task} from './task';
import {loadImport} from './import';

export function page(result: Result, lines: string[], index: Index) {
  let hasBreak: number = null;
  index.page += 1;
  index.task = -1;
  result.chapters[index.chapter].pages.push({
    title: Match.page(lines[0]).trim()
  });
  let inCodeBlock = false;

  let i = 0;
  while (i < lines.length - 1) {
    i += 1;
    let line = lines[i];

    let importFile = Match.isImport(line); // returns string path || boolean
    if (!!importFile) {
      lines = loadImport(lines, importFile);
      continue;
    }

    if (!!Match.codeBlock(line)) {
      if (line.length > 3) {
        result = addToDescriptionOrExplanation(hasBreak, i, result, line, index)
        continue;
      }
      inCodeBlock = !inCodeBlock;
    }

    if (!inCodeBlock) {
      // 1. page title
      if (!hasBreak && Match.isEmpty(line)) {
        hasBreak = i;
        // 3. exit on page title match again or next chapter
      } else if (!!Match.chapter(line)) {
        return chapter(result, lines.slice(i), index);
        // next page
      } else if (!!Match.page(line)) {
        return page(result, lines.slice(i), index);
      } else if (!!Match.task(line)) {
        if (result.chapters[index.chapter].pages[index.page].tasks === undefined) {
          result.chapters[index.chapter].pages[index.page].tasks = [];
        }
        return task(result, lines.slice(i), index);
      } else {
        // description || explanation
        result = addToDescriptionOrExplanation(hasBreak, i, result, line, index);
      }
    }
  }
  return result;
}

function addToDescriptionOrExplanation(hasBreak, i, result, line, index) {
  if (!hasBreak) {
    if (result.chapters[index.chapter].pages[index.page].description === undefined) {
      result.chapters[index.chapter].pages[index.page].description = '';
    }
    if (i > 1) {
      result.chapters[index.chapter].pages[index.page].description += '\n';
    }
    result.chapters[index.chapter].pages[index.page].description += line;
  } else {
    if (result.chapters[index.chapter].pages[index.page].explanation === undefined) {
      result.chapters[index.chapter].pages[index.page].explanation = '';
    }
    if (i > 3) {
      result.chapters[index.chapter].pages[index.page].explanation += '\n';
    }
    result.chapters[index.chapter].pages[index.page].explanation += line;
  }
  return result;
}
