import webpack from 'webpack';
import path from 'path';

export const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './dist/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    root: [path.resolve('./src')],
    extensions: ['.js', '.jsx'],
  },
};
