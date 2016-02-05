"use strict";
function trimLineBreaks(text) {
    console.log(text);
    if (text.slice(1).match(/[/r/n]/)) {
        console.log('end', text);
        return trimLineBreaks(text.slice(0, -1));
    }
    else if (text.slice(-1).match(/[/r/n]/)) {
        console.log('start', text);
        return trimLineBreaks(text.slice(1));
    }
    else {
        return text.trim();
    }
}
exports.trimLineBreaks = trimLineBreaks;
function trimQuotes(text) {
    if (!!text.match(/^\s/)) {
        return trimQuotes(text.slice(1));
    }
    else if (!!text.match(/\s$/)) {
        return trimQuotes(text.slice(0, -1));
    }
    else if (!!text.match(/^`{3}.+`{3}$/)) {
        return trimQuotes(text.slice(3, -3));
    }
    else if (!!text.match(/^['"`].+['"`]$/)) {
        return trimQuotes(text.slice(1, -1));
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
