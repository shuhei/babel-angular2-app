var babel = require('babel-core');
var t = babel.types;
var Transformer = babel.Transformer;

module.exports = new Transformer('angular2-type-annotation', {
  ClassDeclaration: function ClassDeclaration(node, parent, scope, file) {
    var classRef = node.id;
    var className = classRef.name;
    var classBody = node.body.body;
    var annotations = [];
    classBody.forEach(function (bodyNode) {
      if (bodyNode.type === 'MethodDefinition' && bodyNode.kind === 'constructor') {
        var params = bodyNode.value.params;
        params.forEach(function (param) {
          var annotation = param.typeAnnotation && param.typeAnnotation.typeAnnotation;
          if (!annotation) {
            return;
          }
          if (annotation.type !== 'GenericTypeAnnotation') {
            console.log(annotation);
            throw new Error('Type annotation for constructor should be GenericTypeAnnotation: ' + annotation.type);
          }
          // TODO: annotation.typeParameters such as List<Foo>
          annotations.push(annotation.id.name);
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
});
