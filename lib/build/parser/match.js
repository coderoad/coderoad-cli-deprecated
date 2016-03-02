"use strict";
var cleanup_1 = require('./cleanup');
function match(char, times) {
    return new RegExp('^' + char + '{' + times + '}(?!#)(.*?)$', 'gm');
}
var regex = {
    '#': match('#', 1),
    '##': match('#', 2),
    '###': match('#', 3),
    '+': match('\\+', 1),
    '```': match('`', 3),
    'action': /^@(action|test|hint|continue)/,
    'import': /^@import\((.+)\)$/,
    'onComplete': /^@onComplete\((.+)\)$/
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
exports.project = parseWithCode('#');
exports.chapter = parseWithCode('##');
exports.page = parseWithCode('###');
exports.task = parseWithCode('+');
exports.codeBlock = parseWithCode('```');
exports.isAction = parseWithCode('action');
exports.isImport = parseWithCode('import');
exports.isComplete = parseWithCode('onComplete');
exports.isArray = function (line) {
    var isMatch = line.match(/^\[.+\]$/);
    return isMatch ? isMatch[0] : null;
};
function isEmpty(line) {
    return !line.length || !!line.match(/^\s+?[\n\r]/);
}
exports.isEmpty = isEmpty;
