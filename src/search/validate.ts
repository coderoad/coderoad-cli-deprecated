import {yellow} from 'chalk';

export function validateQuery(query: string): void {
  if (query === 'undefined') {
    console.log(yellow(`
      Please provide a search query
      > coderoad search "query"
      `));
    process.exit(1);
  }
}
