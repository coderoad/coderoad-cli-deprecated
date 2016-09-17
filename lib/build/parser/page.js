"use strict";
var Match = require('./match');
var task_1 = require('./task');
var import_1 = require('./import');
var final_1 = require('./final');
var cleanup_1 = require('./cleanup');
function page(_a) {
    var dir = _a.dir, result = _a.result, lines = _a.lines, index = _a.index;
    index.page += 1;
    index.task = -1;
    var title = Match.page(lines[0]);
    if (title === 'Final') {
        return final_1.default({ dir: dir, result: result, lines: lines });
    }
    result.pages.push({
        title: title,
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
                lines = import_1.default({ dir: dir, lines: lines, pathToMd: Match.isImport(line) });
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
            case (!!Match.isResource(line)):
                if (!result.pages[index.page].resources) {
                    result.pages[index.page].resources = [];
                }
                result.pages[index.page].resources.push(cleanup_1.trimValue(Match.isResource(line)));
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
                return page({ dir: dir, result: result, lines: lines.slice(i), index: index });
            case !!Match.task(line):
                if (result.pages[index.page].tasks === undefined) {
                    result.pages[index.page].tasks = [];
                }
                return task_1.default({ dir: dir, result: result, lines: lines.slice(i), index: index });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
