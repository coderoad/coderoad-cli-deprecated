#! /usr/bin/env node

import * as program from 'commander';
import {grey, green} from 'chalk';

import build from './build/build';
import create from './create/create';
import search from './search/search';
import tutorials from './tutorials/tutorials';
import publish from './publish/publish';
import {checkForUpdate} from './update/update';

program
  .version('0.6.0')
  .usage('[options] <keywords>')
  .option('-b, --build [path/to/tutorial.md]',
  'tutorial markdown file', /^.+\.md$/i)
  .option('-c, --create [name]', 'tutorial name')
  .option('-p, --publish [version]',
  'publish tutorial to npm with new version number')
  .option('-t, --tutorials', 'list of tutorial packages')
  .option('-s, --search [query]', 'search for tutorial package')
  .option('-r, --run', 'run tutorial')
  .parse(process.argv);

checkForUpdate();

if (program.build) {
  const tutorial = program.args[0] || 'tutorial/tutorial.md';
  const output = 'coderoad.json';
  process.stdout.write(grey(`building coderoad.json for ${tutorial}...`));
  build(tutorial, output);

} else if (program.create) {
  const packageName = program.args[0];
  create(packageName);

} else if (program.search) {
  const query = program.args[0];
  search(query);

} else if (program.tutorials) {
  tutorials();

} else if (program.publish) {
  const version = program.args[0];
  publish(version);

} else {
  program.help();
}

// success! exit
process.stdout.write(green(' ✓\n'));
process.exit(0);
