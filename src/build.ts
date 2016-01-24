var fs = require('fs');
// JSON.stringify

function line(char: string, times: number) {
  return new RegExp('^' + char + '{' + times + '}(?!#)(.*?)$', 'gm');
}

var regex = {
  '#': line('#', 1),
  '##': line('#', 2),
  '###': line('#', 3),
  '+': line('\\+', 1)
};

function parseWithCode(code: string, content: string) {
  return regex[code].exec(content)[1];
}

fs.readFile('./src/README.md', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  }
  console.log(data);
  // resolve(data.split('\n'));
});

function build() {
  var result = {
    project: {},
    chapters: []
  };

  // load data from file into array


  // data.forEach(function(line) {
  //   console.log(line);
  // })

  // result.project.title = parseWithCode('#', content);
  // result.project.description = '';

  return result;
}

build();

// #


// ##

// ###

// +

// @test

// @action

// @hint
