import {readFileSync} from 'fs';
import {join} from 'path';
import {red} from 'chalk';

let settings = null;
try {
  settings = JSON.parse(
    readFileSync(
      join(process.cwd(), 'package.json'), 'utf8'
    )
  );
} catch (e) {
  console.log(red('No package.json config found in directory ', process.cwd(), e));
}

export const tutorialDir = settings.dir || 'tutorial';
