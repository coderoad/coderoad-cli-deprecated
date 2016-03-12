"use strict";
var cleanup_1 = require('./cleanup');
var Match = require('./match');
function doAction(type, isArray, actionValue, result, line, _a) {
    var chapter = _a.chapter, page = _a.page, task = _a.task;
    if (result.chapters[chapter].pages[page].tasks[task][type] === undefined) {
        result.chapters[chapter].pages[page].tasks[task][type] = [];
    }
    var current = result.chapters[chapter].pages[page].tasks[task][type];
    if (!!isArray) {
        var values_1 = cleanup_1.trimArray(actionValue);
        values_1.forEach(function (value) {
            if (current.indexOf(value) === -1 && values_1.indexOf(value) === -1) {
                result.chapters[chapter].pages[page].tasks[task][type].push(value);
            }
        });
    }
    else {
        if (current.indexOf(actionValue) === -1) {
            result.chapters[chapter].pages[page].tasks[task][type].push(actionValue);
        }
    }
    return result;
}
function addToTasks(result, line, index) {
    var action = Match.isAction(line);
    var chapter = index.chapter, page = index.page, task = index.task;
    var currentTask = result.chapters[chapter].pages[page].tasks[task];
    var trimmedContent = line.slice(action.length + 2, line.length - 1);
    var actionValue = cleanup_1.trimQuotes(trimmedContent);
    var isActionArray = Match.isArray(cleanup_1.trimQuotes(actionValue));
    switch (action) {
        case 'test':
            result = doAction('tests', isActionArray, actionValue, result, line, index);
            break;
        case 'hint':
            result = doAction('hints', isActionArray, actionValue, result, line, index);
            break;
        case 'continue':
            break;
        case 'action':
            if (currentTask.actions === undefined) {
                result.chapters[chapter].pages[page].tasks[task].actions = [];
            }
            if (!!isActionArray) {
                var arrayOfActions = JSON.parse(isActionArray);
                arrayOfActions.forEach(function (value) {
                    value = cleanup_1.trimCommandValue(cleanup_1.trimQuotes(value.trim()));
                    result.chapters[chapter].pages[page].tasks[task].actions.push(value);
                });
            }
            else {
                var value = cleanup_1.trimCommandValue(actionValue);
                result.chapters[chapter].pages[page].tasks[task].actions.push(value);
            }
            return result;
        default:
            console.log('Invalid task action');
    }
    return result;
}
exports.addToTasks = addToTasks;
