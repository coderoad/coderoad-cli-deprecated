"use strict";
var fs_1 = require('fs');
var validate = require('./validators');
var info_1 = require('./parser/info');
var readme_1 = require('./readme');
var cleanup_1 = require('./parser/cleanup');
var path_1 = require('path');
function parseAndBuild(dir, lines) {
    var result = {
        info: {
            title: '',
            description: '',
        },
        pages: [],
    };
    var index = {
        page: -1,
        task: -1,
    };
    return info_1.info(dir, result, lines, index);
}
function build(dir, filePath, output) {
    if (output === void 0) { output = './coderoad.json'; }
    filePath = path_1.join(dir, filePath);
    output = path_1.join(dir, output);
    if (!validate.filePath(filePath)) {
        return false;
    }
    var lines = fs_1.readFileSync(filePath, 'utf8').split('\n');
    var result = cleanup_1.cleanup(parseAndBuild(dir, lines));
    if (!result) {
        return false;
    }
    if (validate.result(result)) {
        fs_1.writeFileSync(output, result, 'utf8');
    }
    if (!readme_1.createReadme(dir)) {
        return false;
    }
    return true;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = build;
