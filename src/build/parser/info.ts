import * as Match from './match';
import page from './page';
import loadImport from './import';

export default function info({ dir, result, lines, index }): CR.Output {
  let inCodeBlock = false;
  let i = -1;

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
          result.info.description += line;
        } else {
          inCodeBlock = !inCodeBlock;
        }
        continue;

      // #
      case !!Match.info(line):
        result.info.title = Match.info(line).trim();
        continue;

      // ##
      case !!Match.page(line):
        return page({dir, result, lines: lines.slice(i), index});

      // description
      default:
        if (i > 1) {
          result.info.description += '\n';
        }
        result.info.description += line;
    }
  }
  return result;
}
