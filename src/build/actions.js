"use strict";
var cleanup_1 = require('./cleanup');
function addToTasks(result, line, index) {
    var action = line.slice(1).split('(')[0];
    var value = cleanup_1.trimQuotes(/\((.*?)\)$/.exec(line)[1]);
    var task = result.chapters[index.chapter].pages[index.page].tasks[index.task];
    switch (action) {
        case 'test':
            if (result.chapters[index.chapter].pages[index.page].tasks[index.task].tests === undefined) {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].tests = [];
            }
            result.chapters[index.chapter].pages[index.page].tasks[index.task].tests.push(value);
            break;
        case 'action':
            var task_1 = result.chapters[index.chapter].pages[index.page].tasks[index.task];
            if (task_1.actions === undefined) {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].actions = [];
            }
            result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(value);
            return result;
            break;
        case 'hint':
            if (task_1.hints === undefined) {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].hints = [];
            }
            result.chapters[index.chapter].pages[index.page].tasks[index.task].hints.push(value);
            break;
        default:
            console.log('Invalid task action');
    }
    return result;
}
exports.addToTasks = addToTasks;
