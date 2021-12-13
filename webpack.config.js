"use strict";

const path = require('path');

module.exports = {
  entry: {
    dashboardLayout: './Samples-Typescript/DashboardLayout/dashboardLayout.ts',
    datasources: './Samples-Typescript/DataSources/datasources.ts',
    filtering: './Samples-Typescript/Filtering/filtering.ts',
    formatting: './Samples-Typescript/Formatting/formatting.tsx',
    moveandresize: './Samples-Typescript/MoveAndResize/moveAndResize.tsx',
    parameters: './Samples-Typescript/Parameters/parameters.ts',
    replayanimation: './Samples-Typescript/ReplayAnimation/replayAnimation.tsx',
    vizImage: './Samples-Typescript/VizImage/vizImage.ts',
  },
  mode: 'production',
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: [
      '*', '.ts', '.js', '.tsx'
    ]
  },
  optimization: {
    minimize: false
  },
  devtool: 'inline-source-map'
};
