import * as fs from 'fs';
import {fileExists} from '../tools/file';

export function createReadme() {
  if (!fileExists('./README.md')) {
    // prompt.start();
    // prompt.get(['overwriteReadme'], function (err, result) {
    //   console.log(result);
    // });
  }
  if (!fileExists('./coderoad.json')) {
    console.log('No coderoad.json file found');
    return;
  });
  if (!fileExists('./package.json')) {
    console.log('No package.json file found');
    return;
  });
  let data = JSON.parse(fs.readFileSync('coderoad.json', 'utf8'));
  let packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  let content = generateReadme(data, packageJson);
  fs.writeFileSync('README.md', content, 'utf8');
}

function generateReadme(data, packageJson): string {
  let readme = [];
  readme.push();
  // title
  readme = readme.concat([
    '# ' + data.project.title,
    '',
    data.project.description,
    ''
  ]);
  // coderoad explanation
  readme = readme.concat([
    '',
    '## CodeRoad',
    '',
    'CodeRoad is an open-sourced interactive tutorial platform for the Atom Editor. Learn more at [CodeRoad.io](http://coderoad.io).',
    ''
  ]);
  // coderoad
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
    let chapters = data.chapters.map(function(chapter) {
      let ch = [
        '### ' + chapter.title,
        '',
        chapter.description,
        ''
      ];
      if (chapter.pages) {
        let pages = chapter.pages.map(function(page) {
          return [
            '##### ' + page.title,
            '',
            page.description,
            ''
          ];
        });
        pages.forEach(function(page) {
          ch = ch.concat(page);
        });
      }
      return ch;
    });

    chapters.forEach(function(chapter) {
      readme = readme.concat(chapter);
    })
  }

  return readme.join('\n');
}