"use strict";
var cleanup_1 = require('./cleanup');
function addAction(result, line, index) {
    var action = line.slice(1).split('(')[0];
    var target = cleanup_1.trimQuotes(/\((.*?)\)$/.exec(line)[1]);
    var task = result.chapters[index.chapter].pages[index.page].tasks[index.task];
    switch (action) {
        case 'test':
            if (task.tests === undefined) {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].tests = [];
            }
            result.chapters[index.chapter].pages[index.page].tasks[index.task].tests.push(target);
            break;
        case 'action':
            if (task.actions === undefined) {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].actions = [];
            }
            result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(target);
            break;
        case 'hint':
            if (task.hints === undefined) {
                result.chapters[index.chapter].pages[index.page].tasks[index.task].hints = [];
            }
            result.chapters[index.chapter].pages[index.page].tasks[index.task].hints.push(target);
            break;
        default:
            console.log('Invalid task action');
    }
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addAction;
