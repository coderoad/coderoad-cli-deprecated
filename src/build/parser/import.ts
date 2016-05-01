import {readFileSync} from 'fs';
import {join} from 'path';
import {fileExists} from '../../tools/file';
import {trimQuotes} from './cleanup';
import {tutorialDir} from './settings';

export function loadImport(lines: string[], pathToMd: string): string[] {
  // add .md suffix
  pathToMd = trimQuotes(pathToMd);
  if (!pathToMd.match(/\.md$/)) {
    pathToMd = pathToMd.concat('.md');
  }
  // get path to imports
  let realPath: string = join(process.cwd(), tutorialDir, pathToMd);
  if (!fileExists(realPath)) {
    console.log('Invalid path to markdown file', realPath);
    return;
  }
  let importLines: string = readFileSync(realPath, 'utf8');
  let splitLines: string[] = importLines.split('\n');
  return lines.concat(splitLines);
}
