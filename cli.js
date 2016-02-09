#! /usr/bin/env node

"use strict";
var program = require('commander');
var chalk = require('chalk');
var build_1 = require('./src/build/build');
var create_1 = require('./src/create/create');
var search_1 = require('./src/search/search');
var tutorials_1 = require('./src/tutorials/tutorials');
var publish_1 = require('./src/publish/publish');
var docs_1 = require('./src/docs/docs');
program
    .version('0.3.9')
    .usage('[options] <keywords>')
    .option('-b, --build [path/to/tutorial.md]', 'tutorial markdown file', /^.+\.md$/i)
    .option('-c, --create [name]', 'tutorial name')
    .option('-p, --publish [version]', 'publish tutorial to npm with new version number')
    .option('-t, --tutorials', 'list of tutorial packages')
    .option('-s, --search [query]', 'search for tutorial package')
    .option('-r, --run', 'run tutorial')
    .option('-d, --docs', 'development documentation')
    .parse(process.argv);
if (!program.args.length &&
    !program.build && !program.tutorials && !program.run && !program.docs) {
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
    if (program.docs) {
        docs_1.default();
    }
    process.exit(0);
}
