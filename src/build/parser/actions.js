"use strict";
var cleanup_1 = require('../cleanup');
var Match = require('./match');
function addToTasks(result, line, index) {
    var action = line.slice(1).split('(')[0];
    var value = cleanup_1.trimQuotes(/\((.*?)\)$/.exec(line)[1]);
    var task = result.chapters[index.chapter].pages[index.page].tasks[index.task];
    var actionValue = Match.isAction(line)[2];
    var isActionArray = Match.isArray(cleanup_1.trimQuotes(actionValue));
    switch (action) {
        case 'test':
            if (result.chapters[index.chapter].pages[index.page].tasks[index.task].tests === undefined) {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].tests = [];
            }
            if (!!isActionArray) {
                var valueList = actionValue.slice(1, -1).split(',');
                valueList.forEach(function (value) {
                    value = cleanup_1.trimQuotes(value.trim());
                    result.chapters[index.chapter].pages[index.page].tasks[index.task].tests.push(value);
                });
            }
            else {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].tests.push(value);
            }
            break;
        case 'action':
            if (task.actions === undefined) {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].actions = [];
            }
            if (!!isActionArray) {
                var arrayOfActions = JSON.parse(isActionArray);
                arrayOfActions.forEach(function (value) {
                    result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(value);
                });
            }
            else {
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
                    value = cleanup_1.trimQuotes(value.trim());
                    result.chapters[index.chapter].pages[index.page].tasks[index.task].hints.push(value);
                });
            }
            else {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].hints.push(value);
            }
            break;
        default:
            console.log('Invalid task action');
    }
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addToTasks;
