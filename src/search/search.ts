import * as chalk from 'chalk';
import {validateQuery} from './validate';

export default function search(query: string): void {
  validateQuery(query);

  console.log(`Searching for "coderoad-${query}"...`);
  console.log(chalk.yellow('Search feature not fully implemented yet.\n'));
  console.log('To search for tutorials follow the instructions below: \n');
  console.log(`Search tutorials on npm:
    > npm search coderoad tutorial
  `);
  // let command = 'npm search coderoad-' + query;
  // exec(command, function(err, out, code) {
  //   if (err) {
  //     console.log(err);
  //     process.exit(1);
  //   }
  //   // process.stderr.write(err);
  //   // process.stdout.write(out);
  //   process.exit(code);
  // });
}
