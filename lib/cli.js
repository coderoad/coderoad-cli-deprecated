#! /usr/bin/env node

"use strict";
var program = require('commander');
var chalk = require('chalk');
var build_1 = require('./build/build');
var create_1 = require('./create/create');
var search_1 = require('./search/search');
var tutorials_1 = require('./tutorials/tutorials');
var publish_1 = require('./publish/publish');
program
    .version('0.3.12')
    .usage('[options] <keywords>')
    .option('-b, --build [path/to/tutorial.md]', 'tutorial markdown file', /^.+\.md$/i)
    .option('-c, --create [name]', 'tutorial name')
    .option('-p, --publish [version]', 'publish tutorial to npm with new version number')
    .option('-t, --tutorials', 'list of tutorial packages')
    .option('-s, --search [query]', 'search for tutorial package')
    .option('-r, --run', 'run tutorial')
    .parse(process.argv);
if (!program.args.length &&
    !program.build && !program.tutorials && !program.run) {
    program.help();
}
else {
    if (program.build) {
        var tutorial = program.args[0] || 'tutorial/tutorial.md';
        var output = 'coderoad.json';
        console.log(chalk.grey("building from " + tutorial + "..."));
        build_1.default(tutorial, output);
        console.log(chalk.grey("build complete: coderoad.json"));
    }
    if (program.create) {
        var packageName = program.args[0];
        create_1.default(packageName);
    }
    if (program.search) {
        var query = program.args[0];
        search_1.default(query);
    }
    if (program.tutorials) {
        tutorials_1.default();
    }
    if (program.publish) {
        var version = program.args[0];
        publish_1.default(version);
    }
    process.exit(0);
}
