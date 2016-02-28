import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

export default function docs() {
  console.log('# CODEROAD DEVELOPMENT DOCS\n');
  let editorCommands = fs.readFileSync(path.join(__dirname, 'docs', 'editor-commands.md'), 'utf8');
  console.log(editorCommands);
}
