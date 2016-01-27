"use strict";
var fs = require('fs');
var chalk = require('chalk');
function line(char, times) {
    return new RegExp('^' + char + '{' + times + '}(?!#)(.*?)$', 'gm');
}
var regex = {
    '#': line('#', 1),
    '##': line('#', 2),
    '###': line('#', 3),
    '+': line('\\+', 1),
    '@': line('@', 1),
    '```': line('`', 3)
};
function isEmpty(line) {
    return !line.length || !!line.match(/^\s+?[\n\r]/);
}
function parseWithCode(code, content) {
    if (!content) {
        return false;
    }
    if (content.match(regex[code])) {
        return regex[code].exec(content)[1];
    }
    else {
        return false;
    }
}
function build(lines) {
    var result = {
        project: {
            title: '',
            description: ''
        },
        chapters: []
    }, index = {
        chapter: -1,
        page: -1,
        task: -1
    };
    return project(result, lines, index);
}
function project(result, lines, index) {
    var matchedAt = null;
    for (var i = 0; i < lines.length; i++) {
        var projectTitleMatch = parseWithCode('#', lines[i]);
        var chapterStart = parseWithCode('##', lines[i]);
        if (projectTitleMatch) {
            matchedAt = i;
            result.project.title = projectTitleMatch.trim();
        }
        else if (chapterStart) {
            return chapter(result, lines.slice(i), index);
        }
        else {
            result.project.description += lines[i] + '\n';
        }
    }
    return result;
}
function chapter(result, lines, index) {
    var matchedAt = null;
    for (var i = 0; i < lines.length; i++) {
        var chapterTitleMatch = parseWithCode('##', lines[i]);
        var pageStart = parseWithCode('###', lines[i]);
        if (chapterTitleMatch && !matchedAt) {
            matchedAt = i;
            index.page = -1;
            index.chapter += 1;
            result.chapters.push({
                title: chapterTitleMatch.trim(),
                description: '',
                pages: []
            });
        }
        else if (pageStart) {
            return page(result, lines.slice(i), index);
        }
        else if (chapterTitleMatch) {
            return chapter(result, lines.slice(i), index);
        }
        else {
            result.chapters[index.chapter].description += lines[i] + '\n';
        }
    }
    return result;
}
function page(result, lines, index) {
    var hasBreak = null;
    index.page += 1;
    index.task = -1;
    result.chapters[index.chapter].pages.push({
        title: parseWithCode('###', lines[0]).trim(),
        description: '',
        explanation: '',
        tasks: []
    });
    var inCodeBlock = false;
    for (var i = 1; i < lines.length; i++) {
        var pageTitleMatch = parseWithCode('###', lines[i]);
        var nextChapter = parseWithCode('##', lines[i]);
        var nextTask = parseWithCode('+', lines[i]);
        var codeBlock = parseWithCode('```', lines[i]);
        if (!!codeBlock) {
            inCodeBlock = !inCodeBlock;
        }
        if (!inCodeBlock) {
            if (!hasBreak && isEmpty(lines[i])) {
                hasBreak = i;
            }
            else if (!!nextChapter) {
                return chapter(result, lines.slice(i), index);
            }
            else if (!!pageTitleMatch) {
                return page(result, lines.slice(i), index);
            }
            else if (!!nextTask) {
                return task(result, lines.slice(i), index);
            }
            else {
                if (!hasBreak) {
                    result.chapters[index.chapter].pages[index.page].description += lines[i] + '\n';
                }
                else {
                    result.chapters[index.chapter].pages[index.page].explanation += lines[i] + '\n';
                }
            }
        }
    }
    return result;
}
function task(result, lines, index) {
    result.chapters[index.chapter].pages[index.page].tasks.push({
        title: parseWithCode('+', lines[0]),
        description: '',
        tests: [],
        actions: []
    });
    index.task += 1;
    var inCodeBlock = false;
    for (var i = 1; i < lines.length; i++) {
        var nextPage = parseWithCode('###', lines[i]);
        var nextChapter = parseWithCode('##', lines[i]);
        var nextTask = parseWithCode('+', lines[i]);
        var isPossibleAction = lines[i].match(/^@action|test|hint/);
        var codeBlock = parseWithCode('```', lines[i]);
        if (!!codeBlock) {
            inCodeBlock = !inCodeBlock;
        }
        if (!inCodeBlock) {
            if (!!isPossibleAction) {
                var action = lines[i].slice(1).split('(')[0];
                var target = /\((.*?)\)$/.exec(lines[i])[1];
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
            else if (!!nextTask) {
                return task(result, lines.slice(i), index);
            }
            else if (!!nextPage) {
                return page(result, lines.slice(i), index);
            }
            else if (!!nextChapter) {
                return chapter(result, lines.slice(i), index);
            }
            else {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].description += lines[i] + '\n';
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
function isValidJSON(text) {
    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return true;
    }
    else {
        return false;
    }
}
function hasProjectInfo(text) {
    var validTitle = text.project.title.length > 0, validDescription = text.project.description.length > 0;
    return validTitle && validDescription;
}
function hasPage(text) {
    return (text.chapters[0].pages.length > 0 && !!text.chapters[0].pages[0].title);
}
module.exports = function (filePath, output) {
    if (output === void 0) { output = './coderoad.json'; }
    if (!filePath) {
        console.log(chalk.red("\n    Pass in a path to your .md file\n    For example: coderoad build ./src/tutorial.md\n    "));
        process.exit(1);
    }
    var lines = fs.readFileSync(filePath, 'utf8').split('\n');
    var result = cleanup(build(lines));
    if (!isValidJSON(result)) {
        console.log(chalk.red("\n      Something went wrong. There seems to be an error in " + filePath + ".\n      "));
        process.exit(1);
    }
    var jsonObject = JSON.parse(result);
    if (!hasProjectInfo(jsonObject)) {
        console.log(chalk.red("\n      Your tutorial is missing basic project information. Check the project title & description.\n      "));
        process.exit(1);
    }
    else if (!hasPage(jsonObject)) {
        console.log(chalk.red("\n      Your tutorial requires at least one page.\n      "));
        process.exit(1);
    }
    fs.writeFileSync(output, result, 'utf8');
};
