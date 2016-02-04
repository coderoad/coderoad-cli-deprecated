"use strict";
var Match = require('./match');
var chapter_1 = require('./chapter');
var page_1 = require('./page');
var actions_1 = require('./actions');
function task(result, lines, index) {
    result.chapters[index.chapter].pages[index.page].tasks.push({
        description: Match.task(lines[0])
    });
    index.task += 1;
    var inCodeBlock = false;
    for (var i = 1; i < lines.length; i++) {
        var line = lines[i];
        if (!!Match.codeBlock(line)) {
            inCodeBlock = !inCodeBlock;
        }
        if (!inCodeBlock) {
            var isAction = Match.isAction(line);
            if (!!isAction) {
                result = actions_1.default(result, line, index);
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
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = task;
