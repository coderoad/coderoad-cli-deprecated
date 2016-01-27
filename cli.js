#! /usr/bin/env node

var program = require('commander'),
  chalk = require('chalk');
program
  .version('0.0.1')
  .usage('[options] <keywords>')
  .option('-b, --build [tutorial.md]', 'tutorial .md file', /^.+\.md$/i)
  .parse(process.argv);
if (!program.args.length) {
  program.help();
} else {
  if (program.build) {
    (function() {
      var tutorial = program.args[0];
      var output = 'coderoad.json';
      var build = require('./src/build');
      console.log(chalk.grey("building from " + tutorial + "..."));
      build(tutorial, output);
      process.exit(0);
    })();
  }
}
