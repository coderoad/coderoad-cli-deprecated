import {trimQuotes} from './cleanup';

function match(char: string, times: number) {
  return new RegExp('^' + char + '{' + times + '}(?!#)(.*?)$', 'gm');
}

var regex = {
  '#': match('#', 1),
  '##': match('#', 2),
  '+': match('\\+', 1),
  '```': match('`', 3),
  'action': /^@(action|test|hint|openConsole|resource)/,
  'import': /^@import\((.+)\)$/,
  'onPageComplete': /^(@onPageComplete.+)/,
};

function parseWithCode(code: string) {
  return function(line: string): string {
    if (!line) {
      return null;
    }
    if (line.match(regex[code])) {
      return trimQuotes(regex[code].exec(line)[1]);
    } else {
      return null;
    }
  };
}

export const info = parseWithCode('#');
export const page = parseWithCode('##');
export const task = parseWithCode('+');
export const codeBlock = parseWithCode('```');
export const isAction = parseWithCode('action');
export const isImport = parseWithCode('import');
export const isPageComplete = parseWithCode('onPageComplete');

export const isArray = function(line: string): string {
  let isMatch = line.match(/^\[.+\]$/);
  return isMatch ? isMatch[0] : null;
};

export function isEmpty(line: string): boolean {
  return !line.length || !!line.match(/^\s+?[\n\r]/);
}
