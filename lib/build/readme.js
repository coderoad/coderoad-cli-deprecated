"use strict";
var fs_1 = require('fs');
var node_file_exists_1 = require('node-file-exists');
var chalk_1 = require('chalk');
function createReadme() {
    if (!node_file_exists_1.default('./coderoad.json')) {
        console.log(chalk_1.red('No coderoad.json file found'));
        return false;
    }
    if (!node_file_exists_1.default('./package.json')) {
        console.log(chalk_1.red('No package.json file found'));
        return false;
    }
    var data = JSON.parse(fs_1.readFileSync('coderoad.json', 'utf8'));
    var packageJson = JSON.parse(fs_1.readFileSync('package.json', 'utf8'));
    var content = generateReadme(data, packageJson);
    fs_1.writeFileSync('README.md', content, 'utf8');
    return true;
}
exports.createReadme = createReadme;
function generateReadme(data, packageJson) {
    var readme = [];
    var info = data.info, pages = data.pages;
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
    var parsedPages = pages.map(function (page) {
        return [
            '##### ' + page.title,
            '',
            page.description,
            ''
        ];
    });
    parsedPages.forEach(function (page) {
        readme = readme.concat(page);
    });
    return readme.join('\n');
}
