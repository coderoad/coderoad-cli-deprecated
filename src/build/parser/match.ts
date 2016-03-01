function match(char: string, times: number) {
  return new RegExp('^' + char + '{' + times + '}(?!#)(.*?)$', 'gm');
}

var regex = {
  '#': match('#', 1),
  '##': match('#', 2),
  '###': match('#', 3),
  '+': match('\\+', 1),
  '```': match('`', 3)
};

function parseWithCode(code: string) {
  return function(line: string): string {
    if (!line) {
      return null;
    }
    if (line.match(regex[code])) {
      return regex[code].exec(line)[1];
    } else {
      return null;
    }
  };
}

export function isEmpty(line: string): boolean {
  return !line.length || !!line.match(/^\s+?[\n\r]/);
}

export const project = parseWithCode('#');
export const chapter = parseWithCode('##');
export const page = parseWithCode('###');
export const task = parseWithCode('+');
export const codeBlock = parseWithCode('```');
export const isArray = function(line: string): string {
  let isMatch = line.match(/^\[.+\]$/);
  return isMatch ? isMatch[0] : null;
}
export const isAction = function(line: string): string {
  // returns [0]: full, [1]: action, [2]: target
  let match: string[] = line.match(/^@(action|test|hint|continue)/);
  return !!match ? match[1] : null;
}
export const isImport = function(line: string): string {
  let isMatch = line.match(/^@import\((.+)\)$/);
  return isMatch ? isMatch[1] : null;
}
