var t = require('babel-core/lib/babel/types');

module.exports = {
  check: t.isClass,
  ClassDeclaration: function ClassDeclaration(node, parent, scope, file) {
    var classRef = node.id;
    var className = classRef.name;
    var classBody = node.body.body;
    var annotations = [];
    classBody.forEach(function (bodyNode) {
      if (bodyNode.type === 'MethodDefinition' && bodyNode.kind === 'constructor') {
        var params = bodyNode.value.params;
        params.forEach(function (param) {
          var annotation = param.typeAnnotation && param.typeAnnotation.typeAnnotation.id.name;
          if (annotation) {
            annotations.push(annotation);
          }
        });
      }
    });
    if (annotations.length > 0) {
      var array = t.arrayExpression(annotations.map(function (annotation) {
        return t.arrayExpression([t.identifier(annotation)]);
      }));
      var propertyName = t.memberExpression(classRef, t.identifier('parameters'), false);
      var assignment = t.expressionStatement(t.assignmentExpression('=', propertyName, array));
      return [node, assignment];
    }
  }
};
