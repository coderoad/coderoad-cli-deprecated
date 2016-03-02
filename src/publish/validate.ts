import * as fs from 'fs';
import * as chalk from 'chalk';
import {fileExists} from '../tools/file';


function incrementVersion(version: string): string {
  let finalDot = version.lastIndexOf('.');
  let start = version.substring(0, finalDot + 1);
  let patch = parseInt(version.substring(finalDot + 1, version.length), 10) + 1;
  return start + patch;
}

function versionIsGreaterThanCurrent(version: string): void {
  if (!fileExists('package.json')) {
    console.log(chalk.yellow(`
  No available package.json file.Create one.
  > npm init
  `));
    process.exit(1);
  }

  let currentVersion: string = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
  if (parseInt(version, 10) <= parseInt(currentVersion, 10)) {
    console.log(chalk.yellow(`
      Published version is not larger than current version.
      Current: "${currentVersion}"
      > coderoad publish "${incrementVersion(currentVersion)}"
  `));
    process.exit(1);
  }
}

const semverRegex = /\b^(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)$\b/i;

function isValidVersion(version: string): void {
  if (!version.match(semverRegex)) {
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
