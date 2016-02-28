"use strict";
var fs = require('fs');
function fileExists(path) {
    try {
        fs.accessSync(path, fs.R_OK | fs.W_OK);
    }
    catch (e) {
        if (e) {
            console.log(e);
            return false;
        }
    }
    return true;
}
exports.fileExists = fileExists;
