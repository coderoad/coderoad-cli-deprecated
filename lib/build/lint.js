"use strict";
var chalk_1 = require('chalk');
var validKeys = {
    info: ['title', 'description'],
    page: ['title', 'description', 'onPageComplete', 'tasks', 'video', 'resource'],
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
    json.pages.forEach(function (page, pIndex) {
        var pKeys = Object.keys(page);
        pKeys.forEach(function (key) {
            if (validKeys.page.indexOf(key) < 0) {
                invalidKeys.push({
                    error: "Invalid Page key \"" + key + "\"",
                    location: "page: " + (pIndex + 1)
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
                            location: "page: " + (pIndex + 1) + ", task: " + (tIndex + 1)
                        });
                    }
                });
                if (!task.tests || task.tests.length < 1) {
                    invalidKeys.push({
                        error: 'Missing Task Test',
                        location: "page: " + (pIndex + 1) + ", task: " + (tIndex + 1)
                    });
                }
            });
        }
        else {
            warningKeys.push({
                warning: 'Missing page tasks',
                location: "page: " + (pIndex + 1)
            });
        }
    });
    if (warningKeys.length > 0) {
        warningKeys.forEach(function (w) {
            console.log(chalk_1.yellow("\nWarning: " + w.warning + ": ", w.location));
        });
    }
    if (invalidKeys.length > 0) {
        invalidKeys.forEach(function (e) {
            console.log(chalk_1.red("\nError: " + e.error + ": ", e.location));
        });
        return false;
    }
    return true;
}
exports.lintOutput = lintOutput;
function isValidJSON(text) {
    if (!/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        console.log(chalk_1.red('\nSomething went wrong. Build did not output valid JSON.'));
        return false;
    }
    return true;
}
exports.isValidJSON = isValidJSON;
function hasTutorialInfo(json) {
    var validTitle = json.info.title.length > 0, validDescription = json.info.description.length > 0;
    if (!(validTitle && validDescription)) {
        console.log(chalk_1.red('\nYour tutorial is missing basic project information. Check the project title & description.'));
        return false;
    }
    return true;
}
exports.hasTutorialInfo = hasTutorialInfo;
function hasPage(json) {
    if (!(json.pages.length > 0 && !!json.pages[0].title)) {
        console.log(chalk_1.red('\nYour tutorial requires at least one page.'));
        return false;
    }
    return true;
}
exports.hasPage = hasPage;
