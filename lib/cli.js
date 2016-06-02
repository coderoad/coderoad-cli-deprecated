#! /usr/bin/env node
"use strict";
var program = require('commander');
var chalk_1 = require('chalk');
var result_1 = require('./result');
var build_1 = require('./build');
var create_1 = require('./create');
var search_1 = require('./search');
var tutorials_1 = require('./tutorials');
var publish_1 = require('./publish');
var update_1 = require('./update');
program
    .version('0.6.0')
    .usage('[options] <keywords>')
    .option('-b, --build [path/to/tutorial.md]', 'tutorial markdown file', /^.+\.md$/i)
    .option('-c, --create [name]', 'tutorial name')
    .option('-p, --publish [version]', 'publish tutorial to npm with new version number')
    .option('-t, --tutorials', 'list of local tutorial packages')
    .option('-s, --search [query]', 'search for tutorial package')
    .option('-r, --run', 'run tutorial')
    .parse(process.argv);
update_1.default();
if (program.build) {
    var tutorial = program.args[0] || 'tutorial/tutorial.md';
    var output = 'coderoad.json';
    process.stdout.write(chalk_1.grey("building coderoad.json for " + tutorial + "..."));
    if (!build_1.default(tutorial, output)) {
        result_1.fail();
    }
}
else if (program.create) {
    var packageName = program.args[0];
    process.stdout.write("Creating demo tutorial \"coderoad-" + packageName + "\"...");
    if (!create_1.default(process.cwd(), packageName)) {
        result_1.fail();
    }
}
else if (program.search) {
    var query = program.args[0];
    search_1.default(query);
}
else if (program.tutorials) {
    process.stdout.write("List of tutorial packages in this directory...");
    var tuts = tutorials_1.default(process.cwd());
    if (!tuts) {
        result_1.fail();
    }
    else {
        process.stdout.write('\n');
        if (tuts.length < 1) {
            process.stdout.write(chalk_1.yellow("  No tutorials in this directory."));
        }
        else {
            tuts.forEach(function (tut) {
                process.stdout.write("  " + tut.name + " : " + tut.version + "\n");
            });
        }
    }
}
else if (program.publish) {
    var version = program.args[0];
    publish_1.default(version);
}
else {
    program.help();
}
result_1.success();
