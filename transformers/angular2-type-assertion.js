var babel = require('babel-core');
var t = babel.types;
var Transformer = babel.Transformer;

module.exports = new Transformer('angular2-type-assertion', {
  ClassDeclaration: function ClassDeclaration(node, parent, scope, file) {
    // TODO: Insert "import { assert } from 'rtts_assert/rtts_assert';" outside.
    var classRef = node.id;
    var classBody = node.body.body;
    classBody.forEach(function (bodyNode) {
      if (bodyNode.type !== 'MethodDefinition') {
        return;
      }
      insertArgumentAssersion(bodyNode.value);
      insertReturnAssertion(bodyNode.value);
    });
  }
});

function argumentTypes(typeName) {
  return t.memberExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('type')),
    t.identifier(typeName)
  );
}

function typeForAnnotation(annotation) {
  if (!annotation) {
    return argumentTypes('any');
  }
  switch (annotation.type) {
    case 'StringTypeAnnotation':
      return argumentTypes('string');
    case 'NumberTypeAnnotation':
      return argumentTypes('number');
    case 'BooleanTypeAnnotation':
      return argumentTypes('boolean');
    case 'GenericTypeAnnotation':
      // TODO: annotation.typeParameters such as List<Foo>
      return annotation.id;
    // TODO: ObjectTypeAnnotation
    // TODO: FunctionTypeAnnotation
    // TODO: Any other types?
    default:
      return argumentTypes('any');
  }
}

function insertArgumentAssersion(func) {
  if (func.params.length === 0) {
    return;
  }
  var identifiers = func.params;
  var hasAnnotations = func.params.reduce(function (acc, param) {
    return acc || !!param.typeAnnotation;
  }, false);
  if (!hasAnnotations) {
    return;
  }
  var types = func.params.map(function(param) {
    var annotation = param.typeAnnotation && param.typeAnnotation.typeAnnotation;
    return typeForAnnotation(annotation);
  });
  var args = identifiers.reduce(function (acc, identifier, i) {
    // Remove default value from identifier.
    acc.push(identifier);
    acc.push(types[i]);
    return acc;
  }, new Array(identifiers.length * 2));
  var statement = t.expressionStatement(
    t.callExpression(
      t.memberExpression(t.identifier('assert'), t.identifier('argumentTypes')),
      args
    )
  );
  func.body.body.unshift(statement);
}

function insertReturnAssertion(func) {
  if (!func.returnType) {
    return;
  }
  var annotation = func.returnType.typeAnnotation;
  // TODO: Find all returns in the function scope.
  var body = func.body.body;
  var lastStatement = body[body.length - 1];
  if (lastStatement.type !== 'ReturnStatement') {
    return;
  }
  var args = [
    lastStatement.argument,
    typeForAnnotation(annotation)
  ];
  var statement = t.returnStatement(
    t.callExpression(
      t.memberExpression(t.identifier('assert'), t.identifier('returnTypes')),
      args
    )
  );
  body[body.length - 1] = statement;
}
