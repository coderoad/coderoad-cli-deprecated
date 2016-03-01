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

    // import
    let importFile: string = Match.isImport(line);
    if (!!importFile) {
      lines = loadImport(lines, importFile);
      continue;
    }

    if (!!Match.codeBlock(line)) {
      if (line.length > 3) {
        result = addToDescription(i, result, line);
        continue;
      }
      inCodeBlock = !inCodeBlock;
    }

    if (!inCodeBlock) {

      let projectTitleMatch: string = Match.project(line);
      if (!!projectTitleMatch) {
        result.project.title = projectTitleMatch.trim();
      } else if (!!Match.chapter(line)) {

        return chapter(result, lines.slice(i), index);
      } else {
        result = addToDescription(i, result, line);
      }
    }
  }
  return result;
}

function addToDescription(i: number, result: CR.Output, line: string): CR.Output {
  if (i > 1) {
    result.project.description += '\n';
  }
  result.project.description += line;
  return result;
}
