"use strict";
var fs_1 = require('fs');
var node_file_exists_1 = require('node-file-exists');
var chalk_1 = require('chalk');
var path_1 = require('path');
function createReadme(dir) {
    if (!node_file_exists_1.default(path_1.join(dir, 'coderoad.json'))) {
        console.log(chalk_1.red('No coderoad.json file found'));
        return false;
    }
    if (!node_file_exists_1.default(path_1.join(dir, 'package.json'))) {
        console.log(chalk_1.red('No package.json file found'));
        return false;
    }
    var data = JSON.parse(fs_1.readFileSync(path_1.join(dir, 'coderoad.json'), 'utf8'));
    var packageJson = JSON.parse(fs_1.readFileSync(path_1.join(dir, 'package.json'), 'utf8'));
    var content = generateReadme(data, packageJson);
    fs_1.writeFileSync(path_1.join(dir, 'README.md'), content, 'utf8');
    return true;
}
exports.createReadme = createReadme;
function generateReadme(data, packageJson) {
    var readme = [];
    var info = data.info, pages = data.pages, final = data.final;
    readme = readme.concat([
        '# ' + info.title,
        '',
        info.description,
        ''
    ]);
    readme = readme.concat([
        '',
        '## CodeRoad',
        '',
        'CodeRoad is an open-sourced interactive tutorial platform for the Atom Editor. Learn more at [CodeRoad.io](http://coderoad.io).',
        ''
    ]);
    readme = readme.concat([
        '',
        '## Setup',
        '',
        '* create a new directory',
        '',
        '   `mkdir ' + packageJson.name + '`',
        '',
        '* create a "package.json" file',
        '',
        '   `npm init --y`',
        '',
        '* install the tutorial package',
        '',
        '    `npm install --save ' + packageJson.name + '`',
        '',
        '* install and run the [atom-coderoad](https://github.com/coderoad/atom-coderoad) plugin',
        ''
    ]);
    readme = readme.concat([
        '',
        '## Outline',
        ''
    ]);
    var parsedPages = pages.map(function (page) { return ([
        '##### ' + page.title,
        '',
        page.description,
        ''
    ]); });
    parsedPages.forEach(function (page) {
        readme = readme.concat(page);
    });
    if (final && final.description) {
        readme = readme.concat([
            '',
            '## Final',
            '',
            final.description,
            ''
        ]);
    }
    return readme.join('\n');
}
