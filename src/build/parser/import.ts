import {readFileSync} from 'fs';
import {join} from 'path';
import fileExists from 'node-file-exists';
import {trimQuotes} from './cleanup';
import {tutorialDir} from './settings';

export function loadImport({ dir, lines, pathToMd }): string[] {
  // add .md suffix
  pathToMd = trimQuotes(pathToMd);
  if (!pathToMd.match(/\.md$/)) {
    if (fileExists(join(dir, tutorialDir, pathToMd.concat('.md')))) {
      pathToMd = pathToMd.concat('.md');
    } else {
      pathToMd = join(pathToMd, 'index.md');
    }
  }
  // get path to imports
  let realPath: string = join(dir, tutorialDir, pathToMd);
  if (!fileExists(realPath)) {
    console.log('Invalid path to markdown file', realPath);
    return;
  }
  let importLines: string = readFileSync(realPath, 'utf8');
  let splitLines: string[] = importLines.split('\n');
  return lines.concat(splitLines);
}
