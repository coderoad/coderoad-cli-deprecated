"use strict";
var chalk_1 = require('chalk');
var validate_1 = require('./validate');
function publish(version) {
    validate_1.default(version);
    console.log("Publishing package version \"" + version + "\"...");
    console.log(chalk_1.yellow('Publish feature not implemented yet.\n'));
    console.log('To publish your tutorial package follow these instructions: \n');
    console.log("Setup a git repo and tag your version:\n    > git init\n    > git add -A\n    > git commit -m \"$your-commit-message$\"\n    > git tag v" + version + "\n    > git add remote origin http://github.com/$your-github-id$/$your-package-name$\n    > git push -u --tags\n  ");
    console.log("Publish your package to npm:\n    > npm publish\n  ");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = publish;
