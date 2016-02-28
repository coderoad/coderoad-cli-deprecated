import * as fs from 'fs';
import * as process from 'process';
import * as chalk from 'chalk';
import {fileExists} from '../tools/file';

function versionIsGreaterThanCurrent(version) {
  if (!fileExists('package.json')) {
    console.log(chalk.yellow(`
  No available package.json file.Create one.
  > npm init
  `));
    process.exit(1);
  }

  let currentVersion = fs.readFileSync('package.json', 'utf8').version;
  if (parseInt(version) <= parseInt(currentVersion)) {
    let incrementedVersion = parseInt(currentVersion) + 0.0.1;
    console.log(chalk.yellow(`
      Published version is not larger than current version.
      Current: "${currentVersion}"
      > coderoad publish "${incrementedVersion}"
  `));
    process.exit(1);
  }
}

const semverRegex = /\b^(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)$\b/i;

function isValidVersion(version) {
  if (!version.match(semverRegex) {
    console.log(chalk.yellow(`
  Not a valid semver version
  > coderoad publish "0.1.0"
  `));
    process.exit(1);
  }
}

export default function validateVersion(version: string) {
  // validate
  isValidVersion(version);
  versionIsGreaterThanCurrent(version);
}
