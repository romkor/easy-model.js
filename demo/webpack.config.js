module.exports = {
  context: __dirname,
  entry: './main.es6',
  output: {
    library: "EasyModel",
    path: __dirname,
    filename: 'dist.js'
  },
  module: {
    loaders: [
      { test: /\.es6?$/, exclude: /(node_modules|bower_components)/, loader: 'babel',
        query: {
          optional: ['runtime']
        }
      },
      { test: /\.json?$/, exclude: /(node_modules|bower_components)/, loader: 'json-loader' }
    ]
  }
};
