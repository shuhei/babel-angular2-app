var path = require('path');

var babelOptions = {
  optional: ['es7.decorators'],
  plugins: [
    './transformers/disable-define',
    'angular2-annotations'
    // 'type-assertion'
  ]
};

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js'
  },
  resolve: {
    alias: {
      // 'angular2': 'angular2/es6/dev',
      // 'rtts_assert': 'rtts_assert/es6'
      'angular2': 'angular2',
      'rtts_assert': 'rtts_assert'
    },
    extensions: ['', '.webpack.js', '.web.js', '.js', '.es6']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?' + JSON.stringify(babelOptions)
      }
    ]
  }
};
