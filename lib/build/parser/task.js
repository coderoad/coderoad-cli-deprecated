"use strict";
var Match = require('./match');
var chapter_1 = require('./chapter');
var page_1 = require('./page');
var actions_1 = require('./actions');
var cleanup_1 = require('./cleanup');
var import_1 = require('./import');
function task(result, lines, index) {
    result.chapters[index.chapter].pages[index.page].tasks.push({
        description: cleanup_1.trimLeadingSpaces(Match.task(lines[0]))
    });
    index.task += 1;
    var inCodeBlock = false;
    var currentAction = null;
    var bracketCount = 0;
    var i = 0;
    while (i < lines.length - 1) {
        i += 1;
        var line = lines[i];
        switch (true) {
            case !!Match.isImport(line):
                lines = import_1.loadImport(lines, Match.isImport(line));
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
                        result.chapters[index.chapter].pages[index.page].tasks[index.task].description += '\n';
                    }
                    result.chapters[index.chapter].pages[index.page].tasks[index.task].description += line;
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
                return task(result, lines.slice(i), index);
            case !!Match.page(line):
                return page_1.page(result, lines.slice(i), index);
            case !!Match.chapter(line):
                return chapter_1.chapter(result, lines.slice(i), index);
            default:
                if (i > 0) {
                    result.chapters[index.chapter].pages[index.page].tasks[index.task].description += '\n';
                }
                result.chapters[index.chapter].pages[index.page].tasks[index.task].description += line;
        }
    }
    return result;
}
exports.task = task;
