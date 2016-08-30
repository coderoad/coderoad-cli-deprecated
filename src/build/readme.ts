import {readFileSync, writeFileSync} from 'fs';
import fileExists from 'node-file-exists';
import {red} from 'chalk';
import {join} from 'path';

export function createReadme(dir): boolean {
  // if (!fileExists('./README.md')) {
  // }
  if (!fileExists(join(dir, 'coderoad.json'))) {
    console.log(red('No coderoad.json file found'));
    return false;
  }
  if (!fileExists(join(dir, 'package.json'))) {
    console.log(red('No package.json file found'));
    return false;
  }
  let data: CR.Output = JSON.parse(readFileSync(join(dir, 'coderoad.json'), 'utf8'));
  let packageJson: PackageJson = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
  let content: string = generateReadme(data, packageJson);
  writeFileSync(join(dir, 'README.md'), content, 'utf8');
  return true;
}

function generateReadme(data: CR.Output, packageJson: PackageJson): string {
  let readme = [];

  const {info, pages} = data;
  // title
  readme = readme.concat([
    '# ' + info.title,
    '',
    info.description,
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
  let parsedPages: string[][] = pages.map((page) => {
    return [
      '##### ' + page.title,
      '',
      page.description,
      ''
    ];
  });

  parsedPages.forEach((page: string[]) => {
    readme = readme.concat(page);
  });

  return readme.join('\n');
}
