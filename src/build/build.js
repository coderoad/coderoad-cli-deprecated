"use strict";
var fs = require('fs');
var validate = require('./validators');
var cleanup_1 = require('./cleanup');
var project_1 = require('./parser/project');
var readme_1 = require('./readme');
function build(lines) {
    var result = {
        project: {},
        chapters: []
    };
    var index = {
        chapter: -1,
        page: -1,
        task: -1
    };
    return project_1.project(result, lines, index);
}
function default_1(filePath, output) {
    if (output === void 0) { output = './coderoad.json'; }
    validate.filePath(filePath);
    var lines = fs.readFileSync(filePath, 'utf8').split('\n');
    var result = cleanup_1.cleanup(build(lines));
    if (validate.result(result)) {
        fs.writeFileSync(output, result, 'utf8');
    }
    readme_1.createReadme();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
