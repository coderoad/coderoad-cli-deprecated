"use strict";
var validations_1 = require('./validations');
var pJKeys = [{
        name: 'name',
        validate: function (name) { return !!name.match(/^coderoad-[A-Za-z0-9\-]+$/); },
        msg: 'must be kebabcased and start with "coderoad"',
        example: '"coderoad-tut-name"',
    }, {
        name: 'version',
        validate: function (version) { return !!version.match(/^[0-9]+\.[0-9]+\.[0-9]+$/); },
        msg: 'must be 3 numbers separated by dots',
        example: '"0.1.0"',
    }, {
        name: 'main',
        validate: function (main) { return main === 'coderoad.json'; },
        msg: 'must point to coderoad.json',
        example: '"coderoad.json"',
    }, {
        name: 'description',
        validate: validations_1.isString,
        msg: 'must be long enough to describe a package',
        example: '"CodeRoad tutorial on ES2015 new features."'
    }, {
        name: 'keywords',
        validate: function (keywords) { return Array.isArray(keywords) && !!keywords.length && keywords.includes('coderoad'); },
        msg: 'must be an array containing "coderoad"',
        example: '[\n"coderoad",\n"tutorial",\n"js"\n]',
    }, {
        name: 'author',
        validate: validations_1.isString,
        msg: 'must have an author name and optional email',
        example: '"Shawn McKay <me@email.com> (http://blog)"',
    }, {
        name: 'config',
        validate: function (config) { return typeof config === 'object'; },
        msg: 'must be an object',
        example: '{\n"language": "JS",\n"runner": "mocha-coderoad"\n}',
    }, {
        name: 'files',
        validate: function (files) { return Array.isArray(files) && files.includes('coderoad.json') && files.includes('tutorial'); },
        msg: 'must be an array including "coderoad.json" & "tutorial"',
        example: '[\n"coderoad.json",\n "tutorial"\n]',
    }, {
        name: 'engines',
        validate: function (engines) { return typeof engines === 'object' && !!engines.node && !!engines.node.match(/^(>=)?[0-9]+/); },
        msg: 'must specify a valid node version',
        example: '{\n "node": ">=0.10.3"\n}',
    }, {
        name: 'language',
        config: true,
        validate: validations_1.isString,
        msg: 'must specify a programming language',
        example: '"JS"',
    }, {
        name: 'runner',
        config: true,
        validate: validations_1.isString,
        msg: 'must specify a test runner',
        example: '"mocha-coderoad"',
    }, {
        name: 'repository',
        optional: true,
        validate: function (repo) {
            return validations_1.isString ||
                typeof repo === 'object' && repo.hasOwnProperty('type')
                    && typeof repo.type === 'string' &&
                    repo.hasOwnProperty('url') && typeof repo.url === 'string';
        },
        msg: 'should have a valid repository',
        example: '"https:\/\/github.com/shmck/coderoad-tutorial-name"',
    }, {
        name: 'bugs',
        optional: true,
        validate: function (bugs) { return typeof bugs === 'object' &&
            bugs.hasOwnProperty('url') && typeof bugs.url === 'string'; },
        msg: 'should have a link to where to post bugs',
        example: '{\n"url": "https:\/\/github.com/shmck/coderoad-tut-name"\n}'
    }, {
        name: 'license',
        optional: true,
        validate: validations_1.isString,
        msg: 'should have a valid license (ex: MIT, ISC, etc.)',
        example: '"MIT"',
    }];
function validatePackageJson(pj) {
    var errors = [];
    var warnings = [];
    pJKeys.forEach(function (key) {
        var target = key.config ? pj.config : pj;
        if (!target.hasOwnProperty(key.name) || !key.validate(target[key.name])) {
            if (key.optional) {
                warnings.push({ name: key.name, msg: key.msg, example: key.example });
            }
            else {
                errors.push({ name: key.name, msg: key.msg, example: key.example });
            }
        }
    });
    return {
        errors: errors,
        warnings: warnings,
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validatePackageJson;
