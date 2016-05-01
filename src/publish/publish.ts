import {yellow} from 'chalk';
import validateVersion from './validate';

export default function publish(version: string): void {
  validateVersion(version);
  process.stdout.write(`Publishing package version "${version}"... \n`);
  console.log(yellow('Publish feature not implemented yet.\n'));
  console.log('To publish your tutorial package follow these instructions: \n');
  console.log(`Setup a git repo and tag your version:
    > git init
    > git add -A
    > git commit -m "$your-commit-message$"
    > git tag v${version}
    > git add remote origin http://github.com/$your-github-id$/$your-package-name$
    > git push -u --tags
  `);
  console.log(`
    Publish your package to npm:
    > npm publish
  `);
}
