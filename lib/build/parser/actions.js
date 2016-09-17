"use strict";
var cleanup_1 = require('./cleanup');
var match_1 = require('./match');
function doAction(_a) {
    var type = _a.type, isArray = _a.isArray, actionValue = _a.actionValue, result = _a.result, page = _a.page, task = _a.task;
    if (result.pages[page].tasks[task][type] === undefined) {
        result.pages[page].tasks[task][type] = [];
    }
    var current = new Set(result.pages[page].tasks[task][type]);
    if (!!isArray) {
        var values = cleanup_1.trimArray(actionValue);
        values.forEach(function (v) {
            current.add(v);
        });
    }
    else {
        current.add(actionValue);
    }
    result.pages[page].tasks[task][type] = Array.from(current);
    return result;
}
function addToTasks(_a) {
    var result = _a.result, line = _a.line, _b = _a.index, page = _b.page, task = _b.task;
    var action = match_1.isAction(line);
    var currentTask = result.pages[page].tasks[task];
    var trimmedContent = line.slice(action.length + 2, line.length - 1);
    var actionValue = cleanup_1.trimQuotes(trimmedContent);
    var isActionArray = match_1.isArray(cleanup_1.trimQuotes(actionValue));
    switch (action) {
        case 'test':
            result = doAction({
                type: 'tests',
                isArray: isActionArray,
                actionValue: actionValue,
                result: result,
                page: page,
                task: task,
            });
            break;
        case 'hint':
            result = doAction({
                type: 'hints',
                isArray: isActionArray,
                actionValue: actionValue,
                result: result,
                page: page,
                task: task,
            });
            break;
        case 'resource':
            result = doAction({
                type: 'resource',
                isArray: isActionArray,
                actionValue: actionValue,
                result: result,
                page: page,
                task: task
            });
            break;
        case 'continue':
            break;
        case 'action':
            if (currentTask.actions === undefined) {
                result.pages[page].tasks[task].actions = [];
            }
            if (!!isActionArray) {
                var arrayOfActions = JSON.parse(isActionArray);
                arrayOfActions.forEach(function (v) {
                    var value = cleanup_1.trimCommandValue(cleanup_1.trimQuotes(v.trim()));
                    result.pages[page].tasks[task].actions.push(value);
                });
            }
            else {
                var value = cleanup_1.trimCommandValue(actionValue);
                result.pages[page].tasks[task].actions.push(value);
            }
            return result;
        default:
            console.log('Invalid task action');
    }
    return result;
}
exports.addToTasks = addToTasks;
