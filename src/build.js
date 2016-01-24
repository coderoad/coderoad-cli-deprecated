// JSON.stringify

function line(char, times) {
  return new RegExp("^" + char + "{" + times + "}(?!#)(.*?)$","g");
}

var regex = {
  '#': line('#', 1),
  '##': line('#', 2),
  '###': line('#', 3)
};

function parseWithCode(code, content) {
  return regex[code].exec(content)[1];
}

// #


// ##

// ###

// +

  // @test

  // @action

  // @hint
