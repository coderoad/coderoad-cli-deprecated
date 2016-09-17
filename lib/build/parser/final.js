"use strict";
var Match = require('./match');
var import_1 = require('./import');
function final(_a) {
    var dir = _a.dir, result = _a.result, lines = _a.lines;
    var inCodeBlock = false;
    var currentPageComplete = null;
    var bracketCount = 0;
    result.final = {
        description: '',
    };
    var i = 0;
    while (i < lines.length - 1) {
        i += 1;
        var line = lines[i];
        switch (true) {
            case !!Match.isImport(line):
                lines = import_1.default({ dir: dir, lines: lines, pathToMd: Match.isImport(line) });
                continue;
            case !!Match.codeBlock(line):
                if (line.length > 3) {
                    result.final.description += '\n' + line;
                }
                else {
                    inCodeBlock = !inCodeBlock;
                }
                continue;
            case inCodeBlock:
                continue;
            default:
                if (i > 1) {
                    result.final.description += '\n';
                }
                result.final.description += line;
                continue;
        }
    }
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = final;
