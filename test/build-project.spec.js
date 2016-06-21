// var expect = require('chai').expect;
// var project = require('../lib/build/parser/project').project;
//
// describe('project', function() {
//
//   var result = function() {
//     return {
//       project: {
//         title: '',
//         description: ''
//       },
//       chapters: []
//     };
//   };
//   var index = function() {
//     return {
//       chapter: -1,
//       page: -1,
//       task: -1
//     };
//   };
//
//
//   it('should return a trimmed project title', function() {
//     var lines = ['# Project Title'];
//     var next = project(result(), lines, index());
//     expect(next.project.title).to.equal('Project Title');
//   });
//
//   it('should return a project description', function() {
//     var lines = ['# Project Title', 'project description'];
//     var next = project(result(), lines, index());
//     expect(next.project.description).to.equal('project description');
//   });
//
//   it('should return a project description with a codeblock', function() {
//     var lines = ['# Project Title', '```', 'var a = 42;', '```'];
//     var next = project(result(), lines, index());
//     expect(next.project.description).to.equal('```\nvar a = 42;\n```');
//   });
//
//   it('should add codeblock languages', function() {
//     var lines = ['# Project Title', '```js', 'var a = 42;', '```'];
//     var next = project(result(), lines, index());
//     expect(next.project.description).to.equal('```js\nvar a = 42;\n```');
//   });
//
//   it('should add single line codeblocks', function() {
//     var lines = ['# Project Title', '```var a = 42;```'];
//     var next = project(result(), lines, index());
//     expect(next.project.description).to.equal('```var a = 42;```');
//   });
//
//   it('should handle strangely formatted codeblocks', function() {
//     var lines = ['# Project Title', '```var a = 42;', '```'];
//     var next = project(result(), lines, index());
//     expect(next.project.description).to.equal('```var a = 42;\n```');
//   });
//
//   it('should import lines in project', function() {
//     var lines = ['# Project Title', 'project description', '', "@import('./test/imports/chapter-sample')"]
//     var next = project(result(), lines, index());
//     var chapter = next.chapters[0];
//     expect(chapter.title).to.equal('Chapter Sample');
//   });
//
//   it('should import lines in project with a .md ending', function() {
//     var lines = ['# Project Title', 'project description', '', "@import('./test/imports/chapter-sample.md')"]
//     var next = project(result(), lines, index());
//     var chapter = next.chapters[0];
//     expect(chapter.title).to.equal('Chapter Sample');
//   });
//
//   it('should accept multiple import lines', function() {
//     var lines = ['# Project Title', 'project description', '',
//       "@import('./test/imports/chapter-sample')", "@import('./test/imports/chapter-sample')"
//     ]
//     var next = project(result(), lines, index());
//     var chapter = next.chapters[1];
//     expect(chapter.title).to.equal('Chapter Sample');
//   });
//
//
//
// });
