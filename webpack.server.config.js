// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require("path");
const webpack = require("webpack");

const APP_NAME = "site"; // CHANGE ME

module.exports = {
  mode: "development",
  entry: {
    // This is our Express server for Dynamic universal
    server: "./server.ts"
  },
  resolve: { extensions: [".js", ".ts"] },
  externals: {
    "./dist/server/main": 'require("./server/main")'
    /* Firebase has some troubles being webpacked when in
       in the Node environment, let's skip it.
       Note: you may need to exclude other dependencies depending
       on your project. */
    //  /^firebase/
  },
  target: "node",
  optimization: {
    minimize: false
  },
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, `dist/${APP_NAME}`),
    library: "app",
    libraryTarget: "umd",
    filename: "[name].js"
  },
  module: {
    noParse: /polyfills-.*\.js/,
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: { system: true }
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, "src"), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, "src"),
      {}
    )
  ]
};
