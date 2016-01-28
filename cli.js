#! /usr/bin/env node
"use strict";
var program = require('commander');
var chalk = require('chalk');
var build_1 = require('./src/build/build');
var create_1 = require('./src/create/create');
program
    .version('0.0.1')
    .usage('[options] <keywords>')
    .option('-b, --build [tutorial.md]', 'tutorial markdown file', /^.+\.md$/i)
    .option('-c, --create [name]', 'tutorial name')
    .option('-p, --publish', 'publish tutorial to npm')
    .option('-l, --list', 'list of tutorial packages')
    .option('-s, --search [query]', 'search for tutorial package')
    .option('-r, --run', 'run tutorial')
    .parse(process.argv);
if (!program.args.length) {
    program.help();
}
else {
    if (program.build) {
        var tutorial = program.args[0];
        var output = 'coderoad.json';
        console.log(chalk.grey("building from " + tutorial + "..."));
        build_1.default(tutorial, output);
    }
    if (program.create) {
        var packageName = program.args[0];
        create_1.default(packageName);
    }
    process.exit(0);
}
