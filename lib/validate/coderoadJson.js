"use strict";
var validKeys = {
    info: ['title', 'description'],
    page: ['title', 'description', 'onPageComplete', 'tasks', 'video', 'link'],
    task: ['description', 'tests', 'actions', 'hints'],
    actions: ['open', 'set', 'insert'],
};
function validateCoderoadJson(json) {
    var errors = [];
    var warnings = [];
    try {
        json.parse(json);
    }
    catch (e) {
        errors.push({
            name: 'json',
            msg: 'is invalid'
        });
        return {
            errors: errors, warnings: warnings
        };
    }
    var infoKeys = Object.keys(json.info);
    infoKeys.forEach(function (key) {
        if (validKeys.info.indexOf(key) < 0) {
            errors.push({
                name: key,
                msg: 'is missing',
                location: "info." + key,
            });
        }
    });
    json.pages.forEach(function (page, pIndex) {
        var pageKeys = Object.keys(page);
        pageKeys.forEach(function (key) {
            if (validKeys.page.indexOf(key) < 0) {
                errors.push({
                    name: key,
                    msg: 'is an invalid key',
                    location: "pages[" + pIndex + "]",
                    example: json.pages[pIndex],
                });
            }
        });
        if (page.tasks && page.tasks.length > 0) {
            page.tasks.forEach(function (task, tIndex) {
                var taskKeys = Object.keys(task);
                taskKeys.forEach(function (key) {
                    if (validKeys.task.indexOf(key) < 0) {
                        errors.push({
                            name: 'page task',
                            msg: "Invalid Task key \"" + key + "\"",
                            location: "pages[" + pIndex + "].tasks[]" + tIndex + "]",
                        });
                    }
                });
                if (!task.tests || task.tests.length < 1) {
                    errors.push({
                        name: 'task test',
                        msg: 'Missing Task Test',
                        location: "pages[" + pIndex + "].tasks[" + tIndex + "]",
                    });
                }
            });
        }
        else {
            warnings.push({
                name: 'page tasks',
                msg: 'are missing',
                location: "pages[" + pIndex + "]",
            });
        }
    });
    return {
        errors: errors,
        warnings: warnings,
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateCoderoadJson;
