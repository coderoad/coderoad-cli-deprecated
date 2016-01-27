// fix build issue with cli.js requiring a break after node env
var cli = fs.readFileSync('cli.js', 'utf8').split('\n');
var fix = cli.slice(0, 1) + '\n\n' + cli.slice(1);
fs.writeFileSync('cli.js'), fix, 'utf8');
