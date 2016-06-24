"use strict";
var validations_1 = require('./validations');
var validKeys = {
    info: ['title', 'description'],
    page: ['title', 'description', 'onPageComplete', 'tasks', 'video', 'link'],
    task: ['description', 'tests', 'actions', 'hints'],
    actions: ['open', 'set', 'insert'],
};
var validateKeys = {
    info: [{
            name: 'title',
            validation: validations_1.isString,
        }, {
            name: 'description',
            validation: validations_1.isString,
        }],
    page: [{
            name: 'title',
            validation: validations_1.isString,
        }, {
            name: 'description',
            validation: validations_1.isString,
        }],
    task: [{
            name: 'description',
            validation: validations_1.isString,
        }, {
            name: 'tests',
            validation: function (tests) { return Array.isArray(tests) && tests.length && tests.every(function (test) { return typeof test === 'string' && test.length; }); },
        }]
};
function validateCoderoadJson(json) {
    var errors = [];
    var warnings = [];
    try {
        JSON.parse(JSON.stringify(json));
    }
    catch (e) {
        errors.push({
            name: 'coderoad.json',
            msg: 'has an error.'
        });
        return {
            errors: errors, warnings: warnings
        };
    }
    var infoKeys = Object.keys(json.info);
    infoKeys.forEach(function (key) {
        if (!validKeys.info.includes(key)) {
            errors.push({
                name: "info." + key,
                msg: 'is not a valid key on info',
                location: "info." + key,
                example: "Did you mean: " + validKeys.info.join(', ')
            });
        }
    });
    validateKeys.info.forEach(function (key) {
        if (!key.validation(json.info[key.name])) {
            errors.push({
                name: "info." + key.name,
                msg: 'is not complete',
                example: "Expected a string, but got: " + json.info[key.name],
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
        validateKeys.page.forEach(function (key) {
            if (!key.validation(page[key.name])) {
                errors.push({
                    name: "pages[" + pIndex + "]." + key.name,
                    msg: 'is not complete',
                    example: "Expected a string, but got: " + page[key.name]
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
                validateKeys.task.forEach(function (key) {
                    if (!key.validation(task[key.name])) {
                        errors.push({
                            name: "pages[" + pIndex + "].tasks[" + tIndex + "]." + key.name,
                            msg: 'is not complete',
                            example: "Expected a string, but got: " + page[key.name]
                        });
                    }
                });
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
