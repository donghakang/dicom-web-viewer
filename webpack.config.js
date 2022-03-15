const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(bin|glb|gltf)$/,
        use: {
          loader: "file-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: {
                  "primary-color": "#00E0C7",
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        generator: {
          filename: "./[name][ext]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[contenthash].js",
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_APP_APIKEY": JSON.stringify(
        process.env.REACT_APP_APIKEY
      ),
      "process.env.REACT_APP_AUTH_DOMAIN": JSON.stringify(
        process.env.REACT_APP_AUTH_DOMAIN
      ),
      "process.env.REACT_APP_PROJECT_ID": JSON.stringify(
        process.env.REACT_APP_PROJECT_ID
      ),
      "process.env.REACT_APP_STORAGE_BUCKET": JSON.stringify(
        process.env.REACT_APP_STORAGE_BUCKET
      ),
      "process.env.REACT_APP_MESSAGE_SENDER_ID": JSON.stringify(
        process.env.REACT_APP_MESSAGE_SENDER_ID
      ),
      "process.env.REACT_APP_APP_ID": JSON.stringify(
        process.env.REACT_APP_APP_ID
      ),
      "process.env.REACT_APP_MEASUREMENT_ID": JSON.stringify(
        process.env.REACT_APP_MEASUREMENT_ID
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
    }),
    new WebpackManifestPlugin({
      fileName: "manifest.json",
      basePath: "./dist",
      
    }),
  ],
  mode: "development",
  stats: "errors-only",
};
