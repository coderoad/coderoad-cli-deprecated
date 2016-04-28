"use strict";
var fs_1 = require('fs');
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
    var data = JSON.parse(fs_1.readFileSync('coderoad.json', 'utf8'));
    var packageJson = JSON.parse(fs_1.readFileSync('package.json', 'utf8'));
    var content = generateReadme(data, packageJson);
    fs_1.writeFileSync('README.md', content, 'utf8');
}
exports.createReadme = createReadme;
function generateReadme(data, packageJson) {
    var readme = [];
    var info = data.info, chapters = data.chapters;
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
    if (chapters) {
        var parsedChapters = chapters.map(function (chapter) {
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
        parsedChapters.forEach(function (chapter) {
            readme = readme.concat(chapter);
        });
    }
    return readme.join('\n');
}
