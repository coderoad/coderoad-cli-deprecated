"use strict";
var pJKeys = [{
        name: 'name',
        validate: function (name) { return name.match(/^coderoad-[A-Za-z0-9\-]+$/); },
        msg: 'must be kebabcased and start with "coderoad"',
        example: 'coderoad-tutorial-name',
    }, {
        name: 'version',
        validate: function (version) { return version.match(/^[0-9]+\.[0-9]+\.[0-9]+$/); },
        msg: 'must be 3 numbers separated by dots',
        example: '0.1.0',
    }, {
        name: 'main',
        validate: function (main) { return main === 'coderoad.json'; },
        msg: 'must point to coderoad.json',
        example: 'coderoad.json',
    }, {
        name: 'description',
        validate: function (desc) { return typeof desc === 'string' && desc.length > 3; },
        msg: 'must be long enough to describe a package',
        example: 'CodeRoad tutorial on ES2015 new features.'
    }, {
        name: 'keywords',
        validate: function (keywords) { return Array.isArray(keywords) && keywords.length && keywords.includes('coderoad'); },
        msg: 'must be an array containing "coderoad"',
        example: '["coderoad", "tutorial", "js"]',
    }, {
        name: 'author',
        validate: function (author) { return typeof author === 'string' && author.length > 2; },
        msg: 'must have an author name and optional email',
        example: 'Shawn McKay <me@email.com> (http://blog)',
    }, {
        name: 'config',
        validate: function (config) { return typeof config === 'object'; },
        msg: 'must be an object',
        example: '"config": {"language": "JS", "runner": "mocha-coderoad"}',
    }, {
        name: 'files',
        validate: function (files) { return Array.isArray(files) && files.includes('coderoad.json') && files.includes('tutorial'); },
        msg: 'must be an array including "coderoad.json" & "tutorial"',
        example: '["coderoad.json", "tutorial"]',
    }, {
        name: 'engines',
        validate: function (engines) { return typeof engines === 'object' && engines.node && engines.node.match(/^[>=]?[0-9]+/); },
        msg: 'must specify a valid node version',
        example: '"engines": { "node": ">=0.10.3"}',
    }, {
        name: 'language',
        config: true,
        validate: function (lang) { return typeof lang === 'string' && lang.length; },
        msg: 'must specify a programming language',
        example: 'JS',
    }, {
        name: 'runner',
        config: true,
        validate: function (runner) { return typeof runner === 'string' && runner.length; },
        msg: 'must specify a test runner',
        example: 'mocha-coderoad',
    }, {
        name: 'repository',
        optional: true,
        validate: function (repo) {
            return typeof repo === 'string' && repo.length ||
                typeof repo === 'object' && repo.hasOwnProperty('type')
                    && typeof repo.type === 'string' &&
                    repo.hasOwnProperty('url') && typeof repo.url === 'string';
        },
        msg: 'should have a valid repository',
        example: 'https://github.com/shmck/coderoad-tutorial-name',
    }, {
        name: 'bugs',
        optional: true,
        validate: function (bugs) { return typeof bugs === 'object' &&
            bugs.hasOwnProperty('url') && typeof bugs.url === 'string'; },
        msg: 'should have a link to where to post bugs',
        example: '"bugs": { "url": "https://github.com/shmck/coderoad-tutorial-name" }'
    }, {
        name: 'license',
        optional: true,
        validate: function (license) { return typeof license === 'string' && license.length; },
        msg: 'should have a valid license (ex: MIT, ISC, etc.)',
        example: 'MIT',
    }];
function validatePackageJson(pj) {
    var errors = [];
    var warnings = [];
    pJKeys.forEach(function (key) {
        var target = pj.config ? pj.config : pj;
        if (!target.hasOwnProperty(key.name) || key.validate(target[key.name])) {
            if (!key.optional) {
                errors.push({ name: key.name, msg: key.msg, example: key.example });
            }
            else {
                warnings.push({ name: key.name, msg: key.msg, example: key.example });
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
