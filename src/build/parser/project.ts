import * as Match from './match';
import {chapter} from './chapter';
import {loadImport} from './import';
import {trimLineBreaks} from './cleanup';

export function project(result: CR.Output, lines: string[], index: CR.Index): CR.Output {
  let inCodeBlock = false;
  let i = -1;

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
          result.project.description += line;
          continue;
        }
        inCodeBlock = !inCodeBlock;
      case inCodeBlock:
        continue;

      // #
      case !!Match.project(line):
        result.project.title = Match.project(line).trim();
        continue;

      // ##
      case !!Match.chapter(line):
        return chapter(result, lines.slice(i), index);

      // description
      default:
        if (i > 1) {
          result.project.description += '\n';
        }
        result.project.description += line;
    }
  }
  return result;
}
