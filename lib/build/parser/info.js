"use strict";
var Match = require('./match');
var page_1 = require('./page');
var import_1 = require('./import');
function info(result, lines, index) {
    var inCodeBlock = false;
    var i = -1;
    while (i < lines.length - 1) {
        i += 1;
        var line = lines[i];
        switch (true) {
            case !!Match.isImport(line):
                lines = import_1.loadImport(lines, Match.isImport(line));
                continue;
            case !!Match.codeBlock(line):
                if (line.length > 3) {
                    result.info.description += line;
                }
                else {
                    inCodeBlock = !inCodeBlock;
                }
                continue;
            case !!Match.info(line):
                result.info.title = Match.info(line).trim();
                continue;
            case !!Match.page(line):
                return page_1.page(result, lines.slice(i), index);
            default:
                if (i > 1) {
                    result.info.description += '\n';
                }
                result.info.description += line;
        }
    }
    return result;
}
exports.info = info;
