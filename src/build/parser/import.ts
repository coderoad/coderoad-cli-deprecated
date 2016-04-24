import {readFileSync} from 'fs';
import {join} from 'path';
import {fileExists} from '../../tools/file';
import {trimQuotes} from './cleanup';

export function loadImport(lines: string[], pathToMd: string): string[] {
  pathToMd = trimQuotes(pathToMd);
  if (!pathToMd.match(/\.md$/)) {
    pathToMd = pathToMd.concat('.md');
  }
  let realPath: string = join(process.cwd(), pathToMd);
  if (!fileExists(pathToMd)) {
    console.log('Invalid path to markdown file', realPath);
    return;
  }
  let importLines: string = readFileSync(realPath, 'utf8');
  let splitLines: string[] = importLines.split('\n');
  return lines.concat(splitLines);
}
