var path = require('path');

var babelOptions = {
  optional: ['es7.decorators'],
  // HACK: Disable strict mode to compile angular2.
  // `angular2/es6/prod/src/change_detection/parser/ast.es6` has methods
  // called eval. They are compiled into `eval: function eval() {}` by
  // babel and webpack raises error for them in strict mode.
  // http://babeljs.io/docs/usage/transformers/other/strict/
  blacklist: ['strict'],
  plugins: [
    './transformers/disable-define',
    './transformers/angular2-type-annotation',
    './transformers/angular2-type-assertion',
    './transformers/angular2-at-annotation'
  ]
};

module.exports = {
  entry: './src/app.es6',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js'
  },
  resolve: {
    alias: {
      // TODO: Use angular2 bundle.js.
      'angular2': 'angular2/es6/dev',
      'rtts_assert': 'rtts_assert/es6'
    },
    extensions: ['', '.webpack.js', '.web.js', '.js', '.es6']
  },
  module: {
    loaders: [
      {
        test: /\.es6$/,
        loader: 'babel?' + JSON.stringify(babelOptions)
      }
    ]
  }
};
