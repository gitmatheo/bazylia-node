const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  module: {
    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: 'babel-loader',
    //     exclude: /node_modules/,
    //   },
    // ],
    exprContextCritical: false,
  },
  resolve: {
    // root: [path.resolve('./src')],
    extensions: ['.js'],
  },
  target: 'node',
  externals: nodeExternals(),
};
