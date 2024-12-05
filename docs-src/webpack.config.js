const path = require('path');
const fs = require('fs-extra'); // fs-extra is a module that extends the standard fs module.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './templates/2sxc/src/main.ts',
    experiments: {
      outputModule: true
    },
    devtool: isProduction ? false : 'source-map', // Enable source maps only in development
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'templates/2sxc/public'),
      libraryTarget: 'module',
      // clean: true,
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['main.js', 'main.js.map', '../../../../docs/public/main.js', '../../../../docs/public/main.js.map'],
        dangerouslyAllowCleanPatternsOutsideProject: true,
        dry: false
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'templates/2sxc/public'), to: path.resolve(__dirname, '../docs/public') }
        ]
      })
    ]
  }
};


