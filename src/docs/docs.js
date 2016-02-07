"use strict";
var fs = require('fs');
var path = require('path');
function docs() {
    console.log('# CODEROAD DEVELOPMENT DOCS\n');
    var editorCommands = fs.readFileSync(path.join(__dirname, 'docs', 'editor-commands.md'), 'utf8');
    console.log(editorCommands);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = docs;
