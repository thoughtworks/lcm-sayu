const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CleanObsoleteChunks = require("webpack-clean-obsolete-chunks");

module.exports = (env, options) => {
  const devMode = options.mode !== "production";

  return {
    optimization: {
      minimizer: [
        new TerserPlugin({ cache: true, parallel: true, sourceMap: devMode }),
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    entry: {
      app: "./src/index.jsx",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "./static"),
    },
    devtool: devMode ? "source-map" : undefined,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    plugins: [
      new CopyPlugin({ patterns: [{ from: "img", to: "img" }] }),
      new LiveReloadPlugin({ appendScriptTag: true, ignore: !devMode }),
      new CleanObsoleteChunks(),
    ]
  };
};
