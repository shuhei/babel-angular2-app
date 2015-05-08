var path = require('path');

var babelOptions = {
  optional: ['es7.decorators'],
  plugins: [
    './transformers/delete-es-module',
    './transformers/disable-define',
    'angular2-annotations',
    'type-assertion'
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
