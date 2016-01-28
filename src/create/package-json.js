"use strict";
function createPackageJson(name) {
    return {
        name: 'coderoad-' + name,
        version: "0.1.0",
        description: "Coderoad tutorial",
        author: '',
        contributers: [],
        main: 'coderoad.json',
        keywords: ['coderoad'],
        dependencies: {},
        devDependencies: {},
        license: "MIT"
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createPackageJson;
