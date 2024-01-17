const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './templates/2sxc/src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'templates/2sxc/public')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'templates/2sxc/public'), 
          to: path.resolve(__dirname, '../docs/public/[name][ext]') 
        }
      ]
    })
  ]
};
