#! /usr/bin/env node

import * as program from 'commander';
import {grey, yellow} from 'chalk';
import {success, fail} from './result';

import build from './build';
import create from './create';
import search from './search';
import tutorials from './tutorials';
import publish from './publish';
import checkForUpdate from './update';
import validate from './validate';

program
  .version('0.7.1')
  .usage('[options] <keywords>')
  .option('-b, --build <path/to/tutorial.md>',
  'tutorial markdown file', /^.+\.md$/i)
  .option('-c, --create <name>', 'tutorial name')
  .option('-p, --publish <version>',
  'publish tutorial to npm with new version number')
  .option('-t, --tutorials', 'list of local tutorial packages')
  .option('-s, --search <query>', 'search for tutorial package')
  .option('-r, --run', 'run tutorial')
  .option('-v, --validate', 'validate tutorial')
  .parse(process.argv);

checkForUpdate();

if (program.build) {
  const tutorialPath = program.args[0] || 'tutorial/tutorial.md';
  const output = 'coderoad.json';
  process.stdout.write(grey(`building coderoad.json for ${tutorialPath}...`));
  // run build
  if (!build({ dir: process.cwd(), filePath: tutorialPath, output })) {
    fail();
  }

} else if (program.create) {
  const packageName = program.args[0];
  process.stdout.write(`Creating demo tutorial "coderoad-${packageName}"...`);
  // run create
  if (!create({ dir: process.cwd(), name: packageName })) {
    fail();
  }

} else if (program.search) {
  const query = program.args[0];
  search(query);

} else if (program.tutorials) {
  // run find tutorials
  process.stdout.write(`List of tutorial packages in this directory...`);
  const tuts = tutorials({ dir: process.cwd() });
  if (!tuts) {
    fail();
  } else {
    process.stdout.write('\n');
    if (tuts.length < 1) {
      process.stdout.write(yellow(`  No tutorials in this directory.`));
    } else {
      tuts.forEach((tut) => {
        process.stdout.write(`  ${tut.name} : ${tut.version}\n`);
      });
    }
  }

} else if (program.publish) {
  const version = program.args[0];
  publish({ version });

} else if (program.validate) {
  if (!validate()) {
    fail();
  }

  // help
} else {
  program.help();
}

// success! exit
success();
