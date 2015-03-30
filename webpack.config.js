var path = require('path');
var babel = require('babel-core');
require('./plugins');

module.exports = {
  entry: './src/app.es6',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js'
  },
  resolve: {
    alias: {
      'angular2': 'angular2/es6/dev',
      'rtts_assert': 'rtts_assert/es6'
    },
    extensions: ['', '.webpack.js', '.web.js', '.js', '.es6']
  },
  module: {
    loaders: [
      {
        test: /\.es6$/,
        // HACK: Disable strict mode to compile angular2.
        // `angular2/es6/prod/src/change_detection/parser/ast.es6` has methods
        // called eval. They are compiled into `eval: function eval() {}` by
        // babel and webpack raises error for them in strict mode.
        // http://babeljs.io/docs/usage/transformers/other/strict/
        loader: 'babel?{"optional": ["es7.decorators"], "blacklist": ["strict"]}'
      }
    ]
  }
};
