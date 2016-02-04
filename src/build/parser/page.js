"use strict";
var Match = require('./match');
var chapter_1 = require('./chapter');
var task_1 = require('./task');
function page(result, lines, index) {
    var hasBreak = null;
    index.page += 1;
    index.task = -1;
    result.chapters[index.chapter].pages.push({
        title: Match.page(lines[0]).trim()
    });
    var inCodeBlock = false;
    for (var i = 1; i < lines.length; i++) {
        var line = lines[i];
        if (!!Match.codeBlock(line)) {
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
                if (!hasBreak) {
                    if (result.chapters[index.chapter].pages[index.page].description === undefined) {
                        result.chapters[index.chapter].pages[index.page].description = '';
                    }
                    result.chapters[index.chapter].pages[index.page].description += line + '\n';
                }
                else {
                    if (result.chapters[index.chapter].pages[index.page].explanation === undefined) {
                        result.chapters[index.chapter].pages[index.page].explanation = '';
                    }
                    result.chapters[index.chapter].pages[index.page].explanation += line + '\n';
                }
            }
        }
    }
    return result;
}
exports.page = page;
