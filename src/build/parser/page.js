"use strict";
var Match = require('./match');
var chapter_1 = require('./chapter');
var task_1 = require('./task');
var import_1 = require('./import');
function page(result, lines, index) {
    var hasBreak = null;
    index.page += 1;
    index.task = -1;
    result.chapters[index.chapter].pages.push({
        title: Match.page(lines[0]).trim()
    });
    var inCodeBlock = false;
    var i = 0;
    while (i < lines.length - 1) {
        i += 1;
        var line = lines[i];
        var importFile = Match.isImport(line);
        if (!!importFile) {
            lines = import_1.loadImport(lines, importFile);
            continue;
        }
        if (!!Match.codeBlock(line)) {
            if (line.length > 3) {
                result = addToDescriptionOrExplanation(hasBreak, i, result, line, index);
                continue;
            }
            inCodeBlock = !inCodeBlock;
        }
        if (!inCodeBlock) {
            if (!hasBreak && Match.isEmpty(line)) {
                hasBreak = i;
            }
            else if (!!Match.chapter(line)) {
                return chapter_1.chapter(result, lines.slice(i), index);
            }
            else if (!!Match.page(line)) {
                return page(result, lines.slice(i), index);
            }
            else if (!!Match.task(line)) {
                if (result.chapters[index.chapter].pages[index.page].tasks === undefined) {
                    result.chapters[index.chapter].pages[index.page].tasks = [];
                }
                return task_1.task(result, lines.slice(i), index);
            }
            else {
                result = addToDescriptionOrExplanation(hasBreak, i, result, line, index);
            }
        }
    }
    return result;
}
exports.page = page;
function addToDescriptionOrExplanation(hasBreak, i, result, line, index) {
    if (!hasBreak) {
        if (result.chapters[index.chapter].pages[index.page].description === undefined) {
            result.chapters[index.chapter].pages[index.page].description = '';
        }
        if (i > 1) {
            result.chapters[index.chapter].pages[index.page].description += '\n';
        }
        result.chapters[index.chapter].pages[index.page].description += line;
    }
    else {
        if (result.chapters[index.chapter].pages[index.page].explanation === undefined) {
            result.chapters[index.chapter].pages[index.page].explanation = '';
        }
        if (i > 3) {
            result.chapters[index.chapter].pages[index.page].explanation += '\n';
        }
        result.chapters[index.chapter].pages[index.page].explanation += line;
    }
    return result;
}
