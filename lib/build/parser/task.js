"use strict";
var Match = require('./match');
var page_1 = require('./page');
var actions_1 = require('./actions');
var cleanup_1 = require('./cleanup');
var import_1 = require('./import');
function task(_a) {
    var dir = _a.dir, result = _a.result, lines = _a.lines, index = _a.index;
    result.pages[index.page].tasks.push({
        description: cleanup_1.trimLeadingSpaces(Match.task(lines[0]))
    });
    index.task += 1;
    var inCodeBlock = false;
    var currentPageComplete = null;
    var currentAction = null;
    var bracketCount = 0;
    var i = 0;
    while (i < lines.length - 1) {
        i += 1;
        var line = lines[i];
        switch (true) {
            case !!Match.isImport(line):
                lines = import_1.loadImport(dir, lines, Match.isImport(line));
                continue;
            case (!!Match.isPageComplete(line) || !!currentPageComplete):
                currentPageComplete = !!currentPageComplete
                    ? currentPageComplete += '\n' + line
                    : Match.isPageComplete(line);
                bracketCount = cleanup_1.bracketTracker(currentPageComplete);
                if (bracketCount === 0) {
                    result.pages[index.page].onPageComplete = cleanup_1.trimValue(currentPageComplete);
                    currentPageComplete = null;
                }
                continue;
            case !!currentAction:
                if (line.length === 0) {
                    currentAction += '\n';
                }
                else if ((cleanup_1.bracketTracker(line) + bracketCount) !== 0) {
                    currentAction += line + '\n';
                    bracketCount += cleanup_1.bracketTracker(line);
                }
                else {
                    currentAction += line;
                    result = actions_1.addToTasks(result, currentAction, index);
                    currentAction = null;
                    bracketCount = 0;
                }
                continue;
            case !Match.isAction(line) && !!Match.codeBlock(line):
                if (line.length > 3) {
                    if (i > 0) {
                        result.pages[index.page].tasks[index.task].description += '\n';
                    }
                    result.pages[index.page].tasks[index.task].description += line;
                }
                else {
                    inCodeBlock = !inCodeBlock;
                }
                continue;
            case !!Match.isAction(line):
                currentAction = line;
                bracketCount = cleanup_1.bracketTracker(line);
                if (bracketCount === 0) {
                    result = actions_1.addToTasks(result, currentAction, index);
                    currentAction = null;
                }
                continue;
            case !!Match.task(line):
                return task({ dir: dir, result: result, lines: lines.slice(i), index: index });
            case !!Match.page(line):
                return page_1.page({ dir: dir, result: result, lines: lines.slice(i), index: index });
            default:
                if (i > 0) {
                    result.pages[index.page].tasks[index.task].description += '\n';
                }
                result.pages[index.page].tasks[index.task].description += line;
        }
    }
    return result;
}
exports.task = task;
