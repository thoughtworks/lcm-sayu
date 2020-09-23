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
        // Load images.
        			{
        				test: /\.(gif|jpe?g|png)$/,
        				loader: 'url-loader?limit=25000',
        				query: {
        					limit: 10000,
        					name: 'static/media/images/[name].[hash:8].[ext]'
        				}
        			},
        			{
        				test: /\.scss$/,
        				loaders: ['style-loader', 'css-loader', 'sass-loader', 'resolve-url-loader?sourceMap', 'sass-loader?sourceMap'],
        				include: path.resolve(__dirname, '../../')
        			},
        			{
        				test: /\.css$/,
        				loader: 'style!css?importLoaders=1'
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
