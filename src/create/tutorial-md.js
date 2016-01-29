"use strict";
var fs = require('fs');
var path = require('path');
function createTutorialMd() {
    console.log('adding tutorial md');
    var tutorialPath = path.join(__dirname, './setup/tutorial.md');
    var tutorial = fs.readFileSync(tutorialPath);
    console.log('path', tutorialPath);
    console.log('tutorial', tutorial);
    fs.writeFileSync('tutorial.md', tutorial, 'utf8');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createTutorialMd;
