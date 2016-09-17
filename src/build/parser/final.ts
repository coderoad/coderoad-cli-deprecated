import * as Match from './match';
import loadImport from './import';
import {bracketTracker, trimValue} from './cleanup';

export default function final({ dir, result, lines }) {
  let inCodeBlock = false;
  let currentPageComplete = null;
  let bracketCount = 0;

  result.final = {
    description: '',
  };

  let i = 0;
  while (i < lines.length - 1) {
    i += 1;
    let line = lines[i];

    switch (true) {

      // @import
      case !!Match.isImport(line):
        lines = loadImport({dir, lines, pathToMd: Match.isImport(line)});
        continue;

      // ``` `
      case !!Match.codeBlock(line):
        if (line.length > 3) {
          result.final.description += '\n' + line;
        } else {
          inCodeBlock = !inCodeBlock;
        }
        continue;
      case inCodeBlock:
        continue;

      // description
      default:
        if (i > 1) {
          result.final.description += '\n';
        }
        result.final.description += line;
        continue;
    }
  }
  return result;
}
