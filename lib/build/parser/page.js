"use strict";
var Match = require('./match');
var chapter_1 = require('./chapter');
var task_1 = require('./task');
var import_1 = require('./import');
var cleanup_1 = require('./cleanup');
function page(result, lines, index) {
    index.page += 1;
    index.task = -1;
    result.chapters[index.chapter].pages.push({
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
                lines = import_1.loadImport(lines, Match.isImport(line));
                continue;
            case (!!Match.isPageComplete(line) || !!currentPageComplete):
                currentPageComplete = !!currentPageComplete
                    ? currentPageComplete += '\n' + line
                    : Match.isPageComplete(line);
                bracketCount = cleanup_1.bracketTracker(currentPageComplete);
                if (bracketCount === 0) {
                    result.chapters[index.chapter].pages[index.page].onPageComplete = cleanup_1.trimValue(currentPageComplete);
                    currentPageComplete = null;
                }
                continue;
            case !!Match.codeBlock(line):
                if (line.length > 3) {
                    result.chapters[index.chapter].pages[index.page].description += '\n' + line;
                }
                else {
                    inCodeBlock = !inCodeBlock;
                }
                continue;
            case inCodeBlock:
                continue;
            case !!Match.chapter(line):
                return chapter_1.chapter(result, lines.slice(i), index);
            case !!Match.page(line):
                return page(result, lines.slice(i), index);
            case !!Match.task(line):
                if (result.chapters[index.chapter].pages[index.page].tasks === undefined) {
                    result.chapters[index.chapter].pages[index.page].tasks = [];
                }
                return task_1.task(result, lines.slice(i), index);
            default:
                if (i > 1) {
                    result.chapters[index.chapter].pages[index.page].description += '\n';
                }
                result.chapters[index.chapter].pages[index.page].description += line;
                continue;
        }
    }
    return result;
}
exports.page = page;
