"use strict";
var fs = require('fs');
function fileExists(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    }
    catch (e) {
        if (e) {
            if (e.code !== 'ENOENT') {
                console.log(e);
            }
            return false;
        }
    }
    return true;
}
exports.fileExists = fileExists;
