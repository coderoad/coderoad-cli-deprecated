"use strict";
var fs = require('fs');
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
function build(filePath) {
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
    var input = fs.readFileSync(filePath, 'utf8');
    var lines = input.split('\n');
    return project(result, lines, index);
}
function project(result, lines, index) {
    let matchedAt = null;
    for (let i = 0; i < lines.length; i++) {
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
    for (let i = 0; i < lines.length; i++) {
        let chapterTitleMatch = parseWithCode('##', lines[i]);
        let pageStart = parseWithCode('###', lines[i]);
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
    let hasBreak = null;
    index.page += 1;
    index.task = -1;
    result.chapters[index.chapter].pages.push({
        title: parseWithCode('###', lines[0]).trim(),
        description: '',
        explanation: '',
        tasks: []
    });
    let inCodeBlock = false;
    for (let i = 1; i < lines.length; i++) {
        let pageTitleMatch = parseWithCode('###', lines[i]);
        let nextChapter = parseWithCode('##', lines[i]);
        let nextTask = parseWithCode('+', lines[i]);
        let codeBlock = parseWithCode('```', lines[i]);
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
    let inCodeBlock = false;
    for (let i = 1; i < lines.length; i++) {
        let nextPage = parseWithCode('###', lines[i]);
        let nextChapter = parseWithCode('##', lines[i]);
        let nextTask = parseWithCode('+', lines[i]);
        let isPossibleAction = lines[i].match(/^@action|test|hint/);
        let codeBlock = parseWithCode('```', lines[i]);
        if (!!codeBlock) {
            inCodeBlock = !inCodeBlock;
        }
        if (!inCodeBlock) {
            if (!!isPossibleAction) {
                let action = lines[i].slice(1).split('(')[0];
                let target = /\((.*?)\)$/.exec(lines[i])[1];
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
    result.chapters.map((chapter) => {
        chapter.description = removeLineBreaks(chapter.description);
        chapter.pages.map((page) => {
            page.description = removeLineBreaks(page.description);
            page.explanation = removeLineBreaks(page.explanation);
            page.tasks.map((task) => {
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
console.log(process.argv);
var output = process.argv[2];
if (!output) {
    throw ('Pass in path to output cr.json file');
}
var input = process.argv[3];
if (!input) {
    throw ('Pass in path to .md file');
}
var result = cleanup(build(input));
if (!isValidJSON(result)) {
    throw ('Invalid JSON output');
}
fs.writeFile(output, result), 'utf8', function (err) {
    if (err)
        return console.log(err);
    console.log(input + ' > ' + output);
};
;
