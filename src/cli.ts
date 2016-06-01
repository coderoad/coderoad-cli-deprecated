#! /usr/bin/env node

import * as program from 'commander';
import {grey} from 'chalk';
import {success, fail} from './result';

import build from './build';
import create from './create';
import search from './search';
import tutorials from './tutorials';
import publish from './publish';
import checkForUpdate from './update';

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
  // run build
  if (!build(tutorial, output)) {
    fail();
  }

} else if (program.create) {
  const packageName = program.args[0];
  process.stdout.write(`Creating demo tutorial "coderoad-${packageName}"...`);
  // run create
  if (!create(packageName)) {
    fail();
  }

} else if (program.search) {
  const query = program.args[0];
  search(query);

} else if (program.tutorials) {
  // run find tutorials
  process.stdout.write(`List of tutorial packages in this directory...`);
  const tuts = tutorials();
  if (!tuts) {
    fail();
  } else {
    process.stdout.write('\n\n')
    tuts.forEach((tut) => {
      process.stdout.write(`    ${tut.name} : ${tut.version}\n`);
    });
  }

} else if (program.publish) {
  const version = program.args[0];
  publish(version);

} else {
  program.help();
}

// success! exit
success();
