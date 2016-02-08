"use strict";
var Match = require('./match');
var chapter_1 = require('./chapter');
var page_1 = require('./page');
var actions_1 = require('./actions');
var cleanup_1 = require('./cleanup');
var import_1 = require('./import');
function bracketTracker(line) {
    var l = (line.match(/\(/g) || []).length;
    var r = (line.match(/\)/g) || []).length;
    return l - r;
}
function task(result, lines, index) {
    result.chapters[index.chapter].pages[index.page].tasks.push({
        description: cleanup_1.trimLeadingSpaces(Match.task(lines[0]))
    });
    index.task += 1;
    var inExpCodeBlock = false;
    var currentAction = null;
    var bracketCount = 0;
    var i = 0;
    while (i < lines.length - 1) {
        i += 1;
        var line = lines[i];
        var importFile = Match.isImport(line);
        if (!!importFile) {
            lines = import_1.loadImport(lines, importFile);
        }
        else {
            if (!!currentAction) {
                var finishedAction = (bracketTracker(line) + bracketCount) === 0;
                if (!finishedAction) {
                    currentAction += line + '\n';
                    bracketCount += bracketTracker(line);
                }
                else {
                    currentAction += line;
                    result = actions_1.addToTasks(result, currentAction, index);
                    currentAction = null;
                    bracketCount = 0;
                }
            }
            else {
                var isAction = Match.isAction(line);
                if (!isAction && !!Match.codeBlock(line)) {
                    inExpCodeBlock = !inExpCodeBlock;
                }
                if (!inExpCodeBlock) {
                    if (!!isAction) {
                        currentAction = line;
                        bracketCount = bracketTracker(line);
                        if (bracketCount === 0) {
                            result = actions_1.addToTasks(result, currentAction, index);
                            currentAction = null;
                        }
                    }
                    else if (!!Match.task(line)) {
                        return task(result, lines.slice(i), index);
                    }
                    else if (!!Match.page(line)) {
                        return page_1.page(result, lines.slice(i), index);
                    }
                    else if (!!Match.chapter(line)) {
                        return chapter_1.chapter(result, lines.slice(i), index);
                    }
                    else {
                        if (i > 0) {
                            result.chapters[index.chapter].pages[index.page].tasks[index.task].description += '\n';
                        }
                        result.chapters[index.chapter].pages[index.page].tasks[index.task].description += line;
                    }
                }
            }
        }
    }
    return result;
}
exports.task = task;
