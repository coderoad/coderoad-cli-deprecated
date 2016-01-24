var fs = require('fs');
function line(char, times) {
    return new RegExp('^' + char + '{' + times + '}(?!#)(.*?)$', 'gm');
}
var regex = {
    '#': line('#', 1),
    '##': line('#', 2),
    '###': line('#', 3),
    '+': line('\\+', 1)
};
function parseWithCode(code, content) {
    return regex[code].exec(content)[1];
}
fs.readFile('./src/README.md', 'utf8', function (err, data) {
    if (err) {
        console.log(err);
    }
    console.log(data);
});
function build() {
    var result = {
        project: {},
        chapters: []
    };
    return result;
}
build();
