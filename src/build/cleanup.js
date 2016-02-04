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
    if (!!text.match(/^ /)) {
        return trimQuotes(text.slice(1));
    }
    if (!!text.match(/^`{3}.+`{3}$/)) {
        return trimQuotes(text.slice(3, -3));
    }
    else if (!!text.match(/^['"`].+['"`]$/)) {
        return trimQuotes(text.slice(1, -1));
    }
    else {
        return text;
    }
}
exports.trimQuotes = trimQuotes;
function cleanup(result) {
    if (result.project.description) {
        result.project.description = removeLineBreaks(result.project.description);
    }
    if (result.chapters) {
        result.chapters.map(function (chapter) {
            if (chapter.description) {
                chapter.description = removeLineBreaks(chapter.description);
            }
            if (chapter.pages) {
                chapter.pages.map(function (page) {
                    if (page.description) {
                        page.description = removeLineBreaks(page.description);
                    }
                    if (page.explanation) {
                        page.explanation = removeLineBreaks(page.explanation);
                    }
                    if (page.tasks) {
                        page.tasks.map(function (task) {
                            if (task.description) {
                                task.description = removeLineBreaks(task.description);
                            }
                        });
                    }
                });
            }
        });
    }
    return JSON.stringify(result, null, 2);
}
exports.cleanup = cleanup;
