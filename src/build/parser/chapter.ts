import * as Match from './match';
import {page} from './page';
import {loadImport} from './import';
import {trimLineBreaks} from './cleanup';

export function chapter(result: Result, lines: string[], index: Index): Result {
  index.page = -1;
  index.chapter += 1;
  result.chapters.push({
    title: Match.chapter(lines[0]).trim(),
    pages: []
  });
  let inCodeBlock = false;
  let i = 0;
  while (i < lines.length - 1) {
    i += 1;

    let line = lines[i];
    // import
    let importFile = Match.isImport(line);
    if (!!importFile) {
      lines = loadImport(lines, importFile);
      continue;
    }

    if (!!Match.codeBlock(line)) {
      if (line.length > 3) {
        result = addToDescription(i, result, line, index);
        continue;
      }
      inCodeBlock = !inCodeBlock;
    }

    if (!inCodeBlock) {
      if (Match.page(line)) {
        return page(result, lines.slice(i), index);
      } else if (Match.chapter(line) && i > 1) {
        return chapter(result, lines.slice(i), index);
      } else {
        result = addToDescription(i, result, line, index);
      }
    }
  }
  return result;
}

function addToDescription(i, result, line, index) {
  if (result.chapters[index.chapter].description === undefined) {
    result.chapters[index.chapter].description = '';
  }
  if (i > 1) {
    result.chapters[index.chapter].description += '\n';
  }
  result.chapters[index.chapter].description += line;
  return result;
}
