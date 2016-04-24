"use strict";
var fs = require('fs');
var file_1 = require('../tools/file');
function createReadme() {
    if (!file_1.fileExists('./README.md')) {
    }
    if (!file_1.fileExists('./coderoad.json')) {
        console.log('No coderoad.json file found');
        return;
    }
    if (!file_1.fileExists('./package.json')) {
        console.log('No package.json file found');
        return;
    }
    var data = JSON.parse(fs.readFileSync('coderoad.json', 'utf8'));
    var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    var content = generateReadme(data, packageJson);
    fs.writeFileSync('README.md', content, 'utf8');
}
exports.createReadme = createReadme;
function generateReadme(data, packageJson) {
    var readme = [];
    readme.push();
    readme = readme.concat([
        '# ' + data.info.title,
        '',
        data.info.description,
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
    if (data.chapters) {
        var chapters = data.chapters.map(function (chapter) {
            var ch = [
                '### ' + chapter.title,
                '',
                chapter.description,
                ''
            ];
            if (chapter.pages) {
                var pages = chapter.pages.map(function (page) {
                    return [
                        '##### ' + page.title,
                        '',
                        page.description,
                        ''
                    ];
                });
                pages.forEach(function (page) {
                    ch = ch.concat(page);
                });
            }
            return ch;
        });
        chapters.forEach(function (chapter) {
            readme = readme.concat(chapter);
        });
    }
    return readme.join('\n');
}
