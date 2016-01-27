#! /usr/bin/env node

var program = require('commander'),
  chalk = require('chalk');
program
  .version('0.0.1')
  .usage('[options] <keywords>')
  .option('-b, --build [tutorial.md]', 'Tutorial Markdown file', /^.+\.md$/i)
  .parse(process.argv);
if (!program.args.length) {
  program.help();
} else {
  if (program.build) {
    (function() {
      var tutorial = program.args[0];
      var output = 'coderoad.json';
      if (!tutorial) {
        console.log(chalk.red("\n        Pass in a path to your .md file, otherwise it defaults to README.md\n        For example: npm start ./src/source.md\n        "));
        process.exit(1);
      }
      var build = require('./src/build');
      console.log(chalk.grey("building from " + tutorial + "..."));
      build(tutorial, output);
    })();
    process.exit(0);
  }
}
