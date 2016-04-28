"use strict";
var chalk_1 = require('chalk');
var validKeys = {
    info: ['title', 'description'],
    chapter: ['title', 'description', 'pages'],
    page: ['title', 'description', 'onPageComplete', 'tasks', 'video', 'link'],
    task: ['description', 'tests', 'actions', 'hints']
};
function lintOutput(json) {
    var invalidKeys = [];
    var warningKeys = [];
    var prKeys = Object.keys(json.info);
    prKeys.forEach(function (key) {
        if (validKeys.info.indexOf(key) < 0) {
            invalidKeys.push({
                error: "Invalid Project key \"" + key + "\"",
                location: 'Project'
            });
        }
    });
    json.chapters.forEach(function (chapter, cIndex) {
        var chKeys = Object.keys(chapter);
        chKeys.forEach(function (key) {
            if (validKeys.chapter.indexOf(key) < 0) {
                invalidKeys.push({
                    error: "Invalid Chapter key \"" + key + "\"",
                    location: "ch: " + (cIndex + 1)
                });
            }
        });
        if (chapter.pages && chapter.pages.length > 0) {
            chapter.pages.forEach(function (page, pIndex) {
                var pKeys = Object.keys(page);
                pKeys.forEach(function (key) {
                    if (validKeys.page.indexOf(key) < 0) {
                        invalidKeys.push({
                            error: "Invalid Page key \"" + key + "\"",
                            location: "ch: " + (cIndex + 1) + ", page: " + (pIndex + 1)
                        });
                    }
                });
                if (page.tasks && page.tasks.length > 0) {
                    page.tasks.forEach(function (task, tIndex) {
                        var tKeys = Object.keys(task);
                        tKeys.forEach(function (key) {
                            if (validKeys.task.indexOf(key) < 0) {
                                invalidKeys.push({
                                    error: "Invalid Task key \"" + key + "\"",
                                    location: "ch: " + (cIndex + 1) + ", page: " + (pIndex + 1) + ", task: " + (tIndex + 1)
                                });
                            }
                        });
                        if (!task.tests || task.tests.length < 1) {
                            invalidKeys.push({
                                error: 'Missing Task Test',
                                location: "ch: " + (cIndex + 1) + ", page: " + (pIndex + 1) + ", task: " + (tIndex + 1)
                            });
                        }
                    });
                }
                else {
                    warningKeys.push({
                        warning: 'Missing page tasks',
                        location: "ch: " + (cIndex + 1) + ", page: " + (pIndex + 1)
                    });
                }
            });
        }
        else {
            warningKeys.push({
                warning: 'Missing pages',
                location: "ch: " + (cIndex + 1)
            });
        }
    });
    if (warningKeys.length > 0) {
        warningKeys.forEach(function (w) {
            console.log(chalk_1.yellow("Warning: " + w.warning + ": ", w.location));
        });
    }
    if (invalidKeys.length > 0) {
        invalidKeys.forEach(function (e) {
            console.log(chalk_1.red("Error: " + e.error + ": ", e.location));
        });
        process.exit(1);
    }
}
exports.lintOutput = lintOutput;
function isValidJSON(text) {
    if (!/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        console.log(chalk_1.red("\n      Something went wrong. Build did not output valid JSON.\n      "));
        process.exit(1);
    }
}
exports.isValidJSON = isValidJSON;
function hasTutorialInfo(json) {
    var validTitle = json.info.title.length > 0, validDescription = json.info.description.length > 0;
    if (!(validTitle && validDescription)) {
        console.log(chalk_1.red("\n      Your tutorial is missing basic project information. Check the project title & description.\n      "));
        process.exit(1);
    }
}
exports.hasTutorialInfo = hasTutorialInfo;
function hasPage(json) {
    if (!(json.chapters[0].pages.length > 0 && !!json.chapters[0].pages[0].title)) {
        console.log(chalk_1.red("\n      Your tutorial requires at least one page.\n      "));
        process.exit(1);
    }
}
exports.hasPage = hasPage;
