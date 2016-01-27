"use strict";
var fs = require('fs');
var process = require('process');
var chalk = require('chalk');
var Match = require('./matchers');
var validators_1 = require('./validators');
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
        description: '',
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
        title: Match.page(lines[0]).trim(),
        description: '',
        explanation: '',
        tasks: []
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
                return task(result, lines.slice(i), index);
            }
            else {
                if (!hasBreak) {
                    result.chapters[index.chapter].pages[index.page].description += line + '\n';
                }
                else {
                    result.chapters[index.chapter].pages[index.page].explanation += line + '\n';
                }
            }
        }
    }
    return result;
}
function task(result, lines, index) {
    result.chapters[index.chapter].pages[index.page].tasks.push({
        title: Match.task(lines[0]),
        description: '',
        tests: [],
        actions: []
    });
    index.task += 1;
    var inCodeBlock = false;
    for (var i = 1; i < lines.length; i++) {
        var line = lines[i];
        if (!!Match.codeBlock(line)) {
            inCodeBlock = !inCodeBlock;
        }
        if (!inCodeBlock) {
            if (!!Match.taskAction(line)) {
                var action = line.slice(1).split('(')[0];
                var target = /\((.*?)\)$/.exec(line)[1];
                switch (action) {
                    case 'test':
                        result.chapters[index.chapter].pages[index.page].tasks[index.task].tests.push(target);
                        break;
                    case 'action':
                        result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(target);
                        break;
                    default:
                        console.log('Invalid task action');
                }
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
                result.chapters[index.chapter].pages[index.page].tasks[index.task].description += line + '\n';
            }
        }
    }
    return result;
}
function removeLineBreaks(text) {
    if (text.slice(-2) === '\n') {
        return removeLineBreaks(text.slice(0, -2));
    }
    else if (text.slice(0, 2) === '\n') {
        return removeLineBreaks(text.slice(2));
    }
    else {
        return text.trim();
    }
}
function cleanup(result) {
    result.project.description = removeLineBreaks(result.project.description);
    result.chapters.map(function (chapter) {
        chapter.description = removeLineBreaks(chapter.description);
        chapter.pages.map(function (page) {
            page.description = removeLineBreaks(page.description);
            page.explanation = removeLineBreaks(page.explanation);
            page.tasks.map(function (task) {
                task.description = removeLineBreaks(task.description);
            });
        });
    });
    return JSON.stringify(result, null, 2);
}
module.exports = function (filePath, output) {
    if (output === void 0) { output = './coderoad.json'; }
    if (!filePath) {
        console.log(chalk.red("\n    Pass in a path to your .md file\n    For example: coderoad build ./src/tutorial.md\n    "));
        process.exit(1);
    }
    var lines = fs.readFileSync(filePath, 'utf8').split('\n');
    var result = cleanup(build(lines));
    if (validators_1.default(result)) {
        fs.writeFileSync(output, result, 'utf8');
    }
};
