module.exports = {
  context: __dirname,
  entry: './src/easy.es6',
  output: {
    libraryTarget: "commonjs2",
    library: "EasyModel",
    path: __dirname,
    filename: 'easy.js'
  },
  target: "node",
  //library: 'EasyModel',
  //libraryTarget: 'commonjs2',
  module: {
    loaders: [
      { test: /\.es6?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' }
    ]
  }
};
