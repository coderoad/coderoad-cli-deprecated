"use strict";
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
function trimQuotes(text) {
    if (!!text.match(/^`{3}.+`{3}$/)) {
        return text.slice(3, -3);
    }
    else if (!!text.match(/^['"`].+['"`]$/)) {
        return text.slice(1, -1);
    }
    else {
        return text;
    }
}
exports.trimQuotes = trimQuotes;
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
exports.cleanup = cleanup;
