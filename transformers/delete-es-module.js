var babel = require('babel-core');
var t = babel.types;
var Transformer = babel.Transformer;

// Remove `export var __esModule = true;`
module.exports = new Transformer('delete-es-module', {
  ExportNamedDeclaration: function (node) {
    if (node.declaration && node.declaration.declarations) {
      var dec = node.declaration.declarations[0];
      if (t.isIdentifier(dec.id, { name: '__esModule' })) {
        this.remove();
      }
    }
  }
});
