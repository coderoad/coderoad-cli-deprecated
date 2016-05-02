"use strict";
var cleanup_1 = require('./cleanup');
function match(char, times) {
    return new RegExp('^' + char + '{' + times + '}(?!#)(.*?)$', 'gm');
}
var regex = {
    '#': match('#', 1),
    '##': match('#', 2),
    '+': match('\\+', 1),
    '```': match('`', 3),
    'action': /^@(action|test|hint|openConsole)/,
    'import': /^@import\((.+)\)$/,
    'onPageComplete': /^(@onPageComplete.+)/
};
function parseWithCode(code) {
    return function (line) {
        if (!line) {
            return null;
        }
        if (line.match(regex[code])) {
            return cleanup_1.trimQuotes(regex[code].exec(line)[1]);
        }
        else {
            return null;
        }
    };
}
exports.info = parseWithCode('#');
exports.page = parseWithCode('##');
exports.task = parseWithCode('+');
exports.codeBlock = parseWithCode('```');
exports.isAction = parseWithCode('action');
exports.isImport = parseWithCode('import');
exports.isPageComplete = parseWithCode('onPageComplete');
exports.isArray = function (line) {
    var isMatch = line.match(/^\[.+\]$/);
    return isMatch ? isMatch[0] : null;
};
function isEmpty(line) {
    return !line.length || !!line.match(/^\s+?[\n\r]/);
}
exports.isEmpty = isEmpty;
