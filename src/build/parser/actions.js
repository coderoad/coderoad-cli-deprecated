"use strict";
var cleanup_1 = require('./cleanup');
var Match = require('./match');
function trimCommandValue(text) {
    var value = text.substring(text.indexOf('(') + 1).slice(0, -1);
    var command = {
        action: text.substring(0, text.indexOf('(')),
        value: cleanup_1.trimLeadingSpaces(cleanup_1.trimQuotes(value))
    };
    return command.action + '(\'' + command.value + '\')';
}
exports.trimCommandValue = trimCommandValue;
function getContentInBrackets(text) {
    return /^\((.*?)\)$/.exec(text)[1];
}
function addToTasks(result, line, index) {
    var match = Match.isAction(line);
    var action = match.action;
    var task = result.chapters[index.chapter].pages[index.page].tasks[index.task];
    var trimmedAction = getContentInBrackets(match.content);
    var actionValue = cleanup_1.trimQuotes(trimmedAction);
    3;
    var isActionArray = Match.isArray(cleanup_1.trimQuotes(actionValue));
    switch (action) {
        case 'test':
            if (result.chapters[index.chapter].pages[index.page].tasks[index.task].tests === undefined) {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].tests = [];
            }
            if (!!isActionArray) {
                var valueList = actionValue.slice(1, -1).split(',');
                valueList.forEach(function (value) {
                    var value = cleanup_1.trimQuotes(value.trim());
                    result.chapters[index.chapter].pages[index.page].tasks[index.task].tests.push(value);
                });
            }
            else {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].tests.push(actionValue);
            }
            break;
        case 'action':
            if (task.actions === undefined) {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].actions = [];
            }
            if (!!isActionArray) {
                var arrayOfActions = JSON.parse(isActionArray);
                arrayOfActions.forEach(function (value) {
                    var value = trimCommandValue(cleanup_1.trimQuotes(value.trim()));
                    result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(value);
                });
            }
            else {
                var value = trimCommandValue(actionValue);
                result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(value);
            }
            return result;
            break;
        case 'hint':
            if (task.hints === undefined) {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].hints = [];
            }
            if (!!isActionArray) {
                var valueList = actionValue.slice(1, -1).split(',');
                valueList.forEach(function (value) {
                    var value = cleanup_1.trimQuotes(value.trim());
                    result.chapters[index.chapter].pages[index.page].tasks[index.task].hints.push(value);
                });
            }
            else {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].hints.push(actionValue);
            }
            break;
        default:
            console.log('Invalid task action');
    }
    return result;
}
exports.addToTasks = addToTasks;
