var t = require('babel-core/lib/babel/types');

module.exports = {
  check: t.isIdenfifier,
  Identifier: function Identifier(node, parent, scope, file) {
    if (node.name === 'define') {
      node.name = '__define__';
    }
  }
};
