"use strict";
var fs = require('fs');
var path = require('path');
function createPackageJson(name) {
    var pathToExample = path.join(__dirname, './setup/package.json');
    var packageJson = JSON.parse(fs.readFileSync(pathToExample, 'utf8'));
    packageJson.name = 'coderoad-' + name;
    var packageJsonString = JSON.stringify(packageJson, null, 2);
    fs.writeFileSync('package.json', packageJsonString, 'utf8');
    return;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createPackageJson;
