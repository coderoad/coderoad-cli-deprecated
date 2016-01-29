"use strict";
var fs = require('fs');
var Match = require('./matchers');
var validate = require('./validators');
var actions_1 = require('./actions');
var cleanup_1 = require('./cleanup');
function build(lines) {
    var result = {
        project: {},
        chapters: []
    };
    var index = {
        chapter: -1,
        page: -1,
        task: -1
    };
    return project(result, lines, index);
}
function project(result, lines, index) {
    result.project = {
        title: '',
        description: ''
    };
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var projectTitleMatch = Match.project(line);
        if (!!projectTitleMatch) {
            result.project.title = projectTitleMatch.trim();
        }
        else if (!!Match.chapter(line)) {
            return chapter(result, lines.slice(i), index);
        }
        else {
            result.project.description += line + '\n';
        }
    }
    return result;
}
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
            return page(result, lines.slice(i), index);
        }
        else if (Match.chapter(line) && i > 0) {
            return chapter(result, lines.slice(i), index);
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
                return chapter(result, lines.slice(i), index);
            }
            else if (!!Match.page(line)) {
                return page(result, lines.slice(i), index);
            }
            else if (!!Match.task(line)) {
                if (result.chapters[index.chapter].pages[index.page].tasks === undefined) {
                    result.chapters[index.chapter].pages[index.page].tasks = [];
                }
                return task(result, lines.slice(i), index);
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
function task(result, lines, index) {
    result.chapters[index.chapter].pages[index.page].tasks.push({
        title: Match.task(lines[0])
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
                return page(result, lines.slice(i), index);
            }
            else if (!!Match.chapter(line)) {
                return chapter(result, lines.slice(i), index);
            }
            else {
                if (result.chapters[index.chapter].pages[index.page].tasks[index.task].description === undefined) {
                    result.chapters[index.chapter].pages[index.page].tasks[index.task].description = '';
                }
                result.chapters[index.chapter].pages[index.page].tasks[index.task].description += line + '\n';
            }
        }
    }
    return result;
}
function default_1(filePath, output) {
    if (output === void 0) { output = './coderoad.json'; }
    validate.filePath(filePath);
    var lines = fs.readFileSync(filePath, 'utf8').split('\n');
    var result = cleanup_1.cleanup(build(lines));
    if (validate.result(result)) {
        fs.writeFileSync(output, result, 'utf8');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
