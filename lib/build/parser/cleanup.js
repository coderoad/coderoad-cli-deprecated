"use strict";
function bracketTracker(line) {
    return line.split('').reduce(function (t, c) {
        switch (c) {
            case '(':
                return t + 1;
            case ')':
                return t - 1;
        }
        return t;
    }, 0);
}
exports.bracketTracker = bracketTracker;
function trimLineBreaks(text) {
    if (text.match(/^\s+|\s+$/)) {
        text = text.replace(/^[\s\r\n]+|[\s\r\n]+$/g, '');
    }
    return text;
}
exports.trimLineBreaks = trimLineBreaks;
function trimArray(text) {
    var array = text.slice(1, -1).match(/(".*?"|[^\s",][^",]+[^\s",])(?=\s*,|\s*$)/g) || [];
    return array.map(function (item) {
        return trimQuotes(trimLineBreaks(item), true);
    });
}
exports.trimArray = trimArray;
var quotes = ['\'', '"'];
function trimQuotes(text, quotesOnly) {
    if (!!text.match(/^[\r\n]/)) {
        return text;
    }
    else if (!!text.match(/^\s/)) {
        return trimQuotes(text.slice(1), quotesOnly);
    }
    else if (!!text.match(/\s$/)) {
        return trimQuotes(text.slice(0, text.length - 1), quotesOnly);
    }
    else if (quotes.indexOf(text.charAt(0)) > -1 &&
        quotes.indexOf(text.charAt(text.length - 1)) > -1) {
        return trimQuotes(text.slice(1, text.length - 1), quotesOnly);
    }
    else if (!quotesOnly &&
        !!text.match(/^`{3}.+`{3}$/m)) {
        return trimQuotes(text.slice(3, text.length - 3), quotesOnly);
    }
    else if (!quotesOnly &&
        text.charAt(0) === '`' &&
        text.charAt(text.length - 1) === '`') {
        return trimQuotes(text.slice(1, text.length - 1), quotesOnly);
    }
    else {
        return text;
    }
}
exports.trimQuotes = trimQuotes;
function trimLeadingSpaces(text) {
    if (!!text.match(/^\s/)) {
        return text.slice(1);
    }
    else {
        return text;
    }
}
exports.trimLeadingSpaces = trimLeadingSpaces;
function trimCommandValue(text) {
    var value = text.substring(text.indexOf('(') + 1).slice(0, -1);
    var command = {
        action: text.substring(0, text.indexOf('(')),
        value: trimLeadingSpaces(trimQuotes(value))
    };
    return command.action + '(\'' + command.value + '\')';
}
exports.trimCommandValue = trimCommandValue;
function trimValue(text) {
    var value = text.substring(text.indexOf('(') + 1).slice(0, -1);
    return trimLeadingSpaces(trimQuotes(value, true));
}
exports.trimValue = trimValue;
function cleanup(result) {
    result = JSON.parse(JSON.stringify(result));
    if (result.info.description) {
        result.info.description = trimLineBreaks(result.info.description);
    }
    if (result.pages) {
        result.pages.map(function (page) {
            if (page.description) {
                page.description = trimLineBreaks(page.description);
            }
            if (page.tasks) {
                page.tasks.map(function (task) {
                    if (task.description) {
                        task.description = trimLineBreaks(task.description);
                    }
                });
            }
        });
    }
    return JSON.stringify(result, null, 2);
}
exports.cleanup = cleanup;
