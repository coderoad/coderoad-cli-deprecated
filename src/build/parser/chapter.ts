import * as Match from './match';
import {page} from './page';
import {loadImport} from './import';
import {trimLineBreaks} from './cleanup';

export function chapter(result: CR.Output, lines: string[], index: CR.Index): CR.Output {
  index.page = -1;
  index.chapter += 1;
  result.chapters.push({
    title: Match.chapter(lines[0]).trim(),
    description: '',
    pages: []
  });
  let inCodeBlock = false;
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
          result.chapters[index.chapter].description += line;
          continue;
        }
        inCodeBlock = !inCodeBlock;
      case inCodeBlock:
        continue;

      // ###
      case !!Match.page(line):
        return page(result, lines.slice(i), index);

      // ##
      case Match.chapter(line) && i > 1:
        return chapter(result, lines.slice(i), index);

      // description
      default:
        if (i > 1) {
          result.chapters[index.chapter].description += '\n';
        }
        result.chapters[index.chapter].description += line;
    }
  }
  return result;
}
