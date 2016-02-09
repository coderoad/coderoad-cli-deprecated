"use strict";
function match(char, times) {
    return new RegExp('^' + char + '{' + times + '}(?!#)(.*?)$', 'gm');
}
var regex = {
    '#': match('#', 1),
    '##': match('#', 2),
    '###': match('#', 3),
    '+': match('\\+', 1),
    '```': match('`', 3)
};
function parseWithCode(code) {
    return function (line) {
        if (!line) {
            return false;
        }
        if (line.match(regex[code])) {
            return regex[code].exec(line)[1];
        }
        else {
            return false;
        }
    };
}
function isEmpty(line) {
    return !line.length || !!line.match(/^\s+?[\n\r]/);
}
exports.isEmpty = isEmpty;
exports.project = parseWithCode('#');
exports.chapter = parseWithCode('##');
exports.page = parseWithCode('###');
exports.task = parseWithCode('+');
exports.codeBlock = parseWithCode('```');
exports.isArray = function (line) {
    var isMatch = line.match(/^\[.+\]$/);
    return isMatch ? isMatch[0] : false;
};
exports.isAction = function (line) {
    var match = line.match(/^@(action|test|hint)/);
    return !!match ? {
        action: match[1]
    } : false;
};
exports.isImport = function (line) {
    var isMatch = line.match(/^@import\((.+)\)$/);
    return isMatch ? isMatch[1] : false;
};
