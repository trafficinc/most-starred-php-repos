const path = require('path');

module.exports = {
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 200,
        poll: 1000,
      },
  entry: './frontend/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'web'),
  },
};
