var t = require('babel-core/lib/babel/types');

module.exports = {
  check: t.isIdenfifier,
  Identifier: function Identifier(node, parent, scope, file) {
    if (node.name === 'define') {
      // Advice from @t_wada
      // https://twitter.com/t_wada/status/582560881533304833
      node.name = '__def_';
    }
  }
};
