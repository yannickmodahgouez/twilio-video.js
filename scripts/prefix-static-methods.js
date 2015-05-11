#!/usr/local/bin/node
var cheerio = require('cheerio');
var fs = require('fs');

var releaseDocs = process.argv[2];
if (!releaseDocs) {
  process.exit(1);
}

var triples = [
  ['Stream', 'getUserMedia', 'Twilio']
];

console.log('Prefixing public constructors from');
triples.forEach(function(triple) {
  var className = triple[0];
  var methodName = triple[1];
  var prefix = triple[2];
  console.log(' - ' + className);
  var classPath = releaseDocs + '/' + className + '.html';
  var classFile = fs.readFileSync(classPath, 'utf8');
  var $ = cheerio.load(classFile);
  var method = $('#\\.' + methodName);
  method.html(method.html().replace(methodName, prefix + '.' + methodName));
  classFile = $.html();
  fs.writeFileSync(classPath, classFile, 'utf8');
});