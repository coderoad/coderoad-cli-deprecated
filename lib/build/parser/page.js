"use strict";
var Match = require('./match');
var task_1 = require('./task');
var import_1 = require('./import');
var cleanup_1 = require('./cleanup');
function page(dir, result, lines, index) {
    index.page += 1;
    index.task = -1;
    result.pages.push({
        title: Match.page(lines[0]).trim(),
        description: ''
    });
    var inCodeBlock = false;
    var currentPageComplete = null;
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
            case !!Match.codeBlock(line):
                if (line.length > 3) {
                    result.pages[index.page].description += '\n' + line;
                }
                else {
                    inCodeBlock = !inCodeBlock;
                }
                continue;
            case inCodeBlock:
                continue;
            case !!Match.page(line):
                return page(dir, result, lines.slice(i), index);
            case !!Match.task(line):
                if (result.pages[index.page].tasks === undefined) {
                    result.pages[index.page].tasks = [];
                }
                return task_1.task(dir, result, lines.slice(i), index);
            default:
                if (i > 1) {
                    result.pages[index.page].description += '\n';
                }
                result.pages[index.page].description += line;
                continue;
        }
    }
    return result;
}
exports.page = page;
