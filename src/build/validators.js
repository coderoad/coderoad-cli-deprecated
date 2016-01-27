"use strict";
function isValidJSON(text) {
    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return true;
    }
    else {
        return false;
    }
}
exports.isValidJSON = isValidJSON;
function hasProjectInfo(json) {
    var validTitle = json.project.title.length > 0, validDescription = json.project.description.length > 0;
    return validTitle && validDescription;
}
exports.hasProjectInfo = hasProjectInfo;
function hasPage(json) {
    return (json.chapters[0].pages.length > 0 && !!json.chapters[0].pages[0].title);
}
exports.hasPage = hasPage;
