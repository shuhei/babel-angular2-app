var babel = require('babel-loader/node_modules/babel-core');
var t = babel.types;
var Transformer = babel.Transformer;

module.exports = new Transformer('angular2-at-annotation', {
  ClassDeclaration: function ClassDeclaration(node, parent, scope, file) {
    var classRef = node.id;
    var decorators = node.decorators;
    if (decorators) {
      node.decorators = null;
      var array = t.arrayExpression(decorators.map(function (decorator) {
        var call = decorator.expression;
        return t.newExpression(call.callee, call.arguments);
      }));
      var propertyName = t.memberExpression(classRef, t.identifier('annotations'), false);
      var assignment = t.expressionStatement(t.assignmentExpression('=', propertyName, array));
      return [node, assignment];
    }
  }
});
