"use strict";
var Match = require('./match');
var page_1 = require('./page');
function chapter(result, lines, index) {
    index.page = -1;
    index.chapter += 1;
    result.chapters.push({
        title: Match.chapter(lines[0]).trim(),
        pages: []
    });
    for (var i = 1; i < lines.length; i++) {
        var line = lines[i];
        if (Match.page(line)) {
            return page_1.page(result, lines.slice(i), index);
        }
        else if (Match.chapter(line) && i > 1) {
            return chapter(result, lines.slice(i), index);
        }
        else {
            if (result.chapters[index.chapter].description === undefined) {
                result.chapters[index.chapter].description = '';
            }
            if (i > 1) {
                result.chapters[index.chapter].description += '\n';
            }
            result.chapters[index.chapter].description += line;
        }
    }
    return result;
}
exports.chapter = chapter;
