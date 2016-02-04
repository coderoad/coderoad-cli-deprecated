"use strict";
var Match = require('./match');
var chapter_1 = require('./chapter');
var page_1 = require('./page');
var actions_1 = require('./actions');
function bracketTracker(line) {
    var l = (line.match(/\(/g) || []).length;
    var r = (line.match(/\)/g) || []).length;
    return l - r;
}
function task(result, lines, index) {
    result.chapters[index.chapter].pages[index.page].tasks.push({
        description: Match.task(lines[0])
    });
    index.task += 1;
    var inCodeBlock = false;
    var currentAction = null;
    var bracketCount = 0;
    for (var i = 1; i < lines.length; i++) {
        var line = lines[i];
        var finishedAction = (bracketTracker(line) + bracketCount) === 0;
        if (!!currentAction && !finishedAction) {
            currentAction += line;
            bracketCount += bracketTracker(line);
        }
        else if (!!currentAction) {
            currentAction += line;
            result = actions_1.default(result, currentAction, index);
            currentAction = null;
            bracketCount = 0;
        }
        else {
            var isAction = Match.isAction(line);
            if (!isAction && !!Match.codeBlock(line)) {
                inCodeBlock = !inCodeBlock;
            }
            if (!inCodeBlock) {
                if (!!isAction) {
                    currentAction = line;
                    bracketCount = bracketTracker(line);
                    if (bracketCount === 0) {
                        result = actions_1.default(result, currentAction, index);
                        currentAction = null;
                    }
                }
                else if (!!Match.task(line)) {
                    return task(result, lines.slice(i), index);
                }
                else if (!!Match.page(line)) {
                    return page_1.default(result, lines.slice(i), index);
                }
                else if (!!Match.chapter(line)) {
                    return chapter_1.default(result, lines.slice(i), index);
                }
                else {
                    result.chapters[index.chapter].pages[index.page].tasks[index.task].description += line + '\n';
                }
            }
        }
    }
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = task;
