import * as process from 'process';
import * as chalk from 'chalk';

export function validateQuery(query: string) {
  if (query === 'undefined') {
    console.log(chalk.yellow(`
      Please provide a search query
      > coderoad search "query"
      `));
    process.exit(1);
  }
}
