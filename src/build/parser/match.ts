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
  return function(line: string) {
    if (!line) {
      return false;
    }
    if (line.match(regex[code])) {
      return regex[code].exec(line)[1];
    } else {
      return false;
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
export const isArray = function(line: string) {
  let isMatch = line.match(/^\[.+\]$/);
  return isMatch ? isMatch[0] : false;
}
export const isAction = function(line: string) {
  // returns [0]: full, [1]: action, [2]: target
  let match = line.match(/^@(action|test|hint)/);
  return !!match ? {
    action: match[1]
    // content: match[2]
  } : false;
}
export const isImport = function(line: string) {
  let isMatch = line.match(/^@import\((.+)\)$/);
  return isMatch ? isMatch[1] : false;
}
