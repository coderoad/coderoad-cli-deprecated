"use strict";
var Match = require('./match');
var chapter_1 = require('./chapter');
var page_1 = require('./page');
function chapter(result, lines, index) {
    index.page = -1;
    index.chapter += 1;
    result.chapters.push({
        title: Match.chapter(lines[0]).trim(),
        pages: []
    });
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (Match.page(line)) {
            return page_1.default(result, lines.slice(i), index);
        }
        else if (Match.chapter(line) && i > 0) {
            return chapter_1.default(result, lines.slice(i), index);
        }
        else {
            if (result.chapters[index.chapter].description === undefined) {
                result.chapters[index.chapter].description = '';
            }
            result.chapters[index.chapter].description += line + '\n';
        }
    }
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = chapter;
