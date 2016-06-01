#! /usr/bin/env node
"use strict";
var program = require('commander');
var chalk_1 = require('chalk');
var build_1 = require('./build/build');
var create_1 = require('./create/create');
var search_1 = require('./search/search');
var tutorials_1 = require('./tutorials/tutorials');
var publish_1 = require('./publish/publish');
var update_1 = require('./update/update');
program
    .version('0.6.0')
    .usage('[options] <keywords>')
    .option('-b, --build [path/to/tutorial.md]', 'tutorial markdown file', /^.+\.md$/i)
    .option('-c, --create [name]', 'tutorial name')
    .option('-p, --publish [version]', 'publish tutorial to npm with new version number')
    .option('-t, --tutorials', 'list of tutorial packages')
    .option('-s, --search [query]', 'search for tutorial package')
    .option('-r, --run', 'run tutorial')
    .parse(process.argv);
update_1.checkForUpdate();
if (program.build) {
    var tutorial = program.args[0] || 'tutorial/tutorial.md';
    var output = 'coderoad.json';
    process.stdout.write(chalk_1.grey("building coderoad.json for " + tutorial + "..."));
    build_1.default(tutorial, output);
}
else if (program.create) {
    var packageName = program.args[0];
    create_1.default(packageName);
}
else if (program.search) {
    var query = program.args[0];
    search_1.default(query);
}
else if (program.tutorials) {
    tutorials_1.default();
}
else if (program.publish) {
    var version = program.args[0];
    publish_1.default(version);
}
else {
    program.help();
}
process.stdout.write(chalk_1.green(' ✓\n'));
process.exit(0);
