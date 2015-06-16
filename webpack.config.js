module.exports = {
  entry: './src/EasyModel.es6',
  output: {
    filename: 'easy-model.js'
  },
  module: {
    loaders: [
      { test: /\.es6?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' }
    ]
  }
};
