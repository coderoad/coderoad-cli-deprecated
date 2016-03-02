"use strict";
var cleanup_1 = require('./cleanup');
var Match = require('./match');
function doAction(type, isArray, actionValue, result, line, index) {
    if (result.chapters[index.chapter].pages[index.page].tasks[index.task][type] === undefined) {
        result.chapters[index.chapter].pages[index.page].tasks[index.task][type] = [];
    }
    if (!!isArray) {
        var values = cleanup_1.trimArray(actionValue);
        values.forEach(function (value) {
            result.chapters[index.chapter].pages[index.page].tasks[index.task][type].push(value);
        });
    }
    else {
        result.chapters[index.chapter].pages[index.page].tasks[index.task][type].push(actionValue);
    }
    return result;
}
function addToTasks(result, line, index) {
    var action = Match.isAction(line);
    var task = result.chapters[index.chapter].pages[index.page].tasks[index.task];
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
            if (task.actions === undefined) {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].actions = [];
            }
            if (!!isActionArray) {
                var arrayOfActions = JSON.parse(isActionArray);
                arrayOfActions.forEach(function (value) {
                    value = cleanup_1.trimCommandValue(cleanup_1.trimQuotes(value.trim()));
                    result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(value);
                });
            }
            else {
                var value = cleanup_1.trimCommandValue(actionValue);
                result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(value);
            }
            return result;
        default:
            console.log('Invalid task action');
    }
    return result;
}
exports.addToTasks = addToTasks;
