var babel = require('babel-core');
var File = require('babel-core/lib/babel/transformation/file');
var Transformer = require('babel-core/lib/babel/transformation/transformer');

var transformers = {
  'angular2.typeAnnotation': require('./transformers/angular2-type-annotation'),
  'angular2.atAnnotation': require('./transformers/angular2-at-annotation')
};

File.prototype.buildPlugins = function buildPlugins(stack) {
  Object.keys(transformers).forEach(function(key) {
    var rawTransformer = transformers[key];
    var transformer = new Transformer(key, rawTransformer, {});
    var pass = transformer.buildPass(this);
    stack.push(pass);
  }, this);
};
