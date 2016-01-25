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
    '@': line('@', 1)
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
        project: {},
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
            result.project.description = lines.slice(matchedAt + 1, i).toString();
            return chapter(result, lines.slice(i), index);
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
            result.chapters[index.chapter].description = lines.slice(matchedAt + 1, i).toString();
            return page(result, lines.slice(i), index);
        }
        else if (chapterTitleMatch) {
            result.chapters[index.chapter].description = lines.slice(matchedAt + 1, i).toString();
            return chapter(result, lines.slice(i), index);
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
    for (let i = 1; i < lines.length; i++) {
        let pageTitleMatch = parseWithCode('###', lines[i]);
        let nextChapter = parseWithCode('##', lines[i]);
        let nextTask = parseWithCode('+', lines[i]);
        if (!hasBreak && isEmpty(lines[i])) {
            hasBreak = i;
        }
        else if (!!pageTitleMatch || !!nextChapter || !!nextTask) {
            if (hasBreak) {
                result.chapters[index.chapter].pages[index.page].description = lines.slice(1, hasBreak).toString();
                result.chapters[index.chapter].pages[index.page].explanation = lines.slice(hasBreak + 1, i).toString();
            }
            else {
                result.chapters[index.chapter].pages[index.page].description = lines.slice(1, i).toString();
            }
            if (!!nextChapter) {
                return chapter(result, lines.slice(i), index);
            }
            else if (!!pageTitleMatch) {
                return page(result, lines.slice(i), index);
            }
            else if (!!nextTask) {
                return task(result, lines.slice(i), index);
            }
            return result;
        }
    }
}
function task(result, lines, index) {
    result.chapters[index.chapter].pages[index.page].tasks.push({
        title: parseWithCode('+', lines[0]),
        description: '',
        tests: [],
        actions: []
    });
    index.task += 1;
    for (let i = 1; i < lines.length; i++) {
        let nextPage = parseWithCode('###', lines[i]);
        let nextChapter = parseWithCode('##', lines[i]);
        let nextTask = parseWithCode('+', lines[i]);
        let isPossibleAction = lines[i].match(/^@/);
        if (!!nextPage || !!nextChapter || !!nextTask) {
            result.chapters[index.chapter].pages[index.page].tasks[index.task].description = lines.slice(1, i).toString();
        }
        if (!!nextTask) {
            return task(result, lines.slice(i), index);
        }
        else if (!!nextPage) {
            return page(result, lines.slice(i), index);
        }
        else if (!!nextChapter) {
            return chapter(result, lines.slice(i), index);
        }
        else if (!!isPossibleAction) {
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
    }
    return result;
}
console.log(build('./src/README.md').chapters[0].pages[1]);
