const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();

// workbox
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const mode = process.env.NODE_ENV || 'development';

const SRC_DIR = path.join(__dirname, './src');
const DIST_DIR = path.join(__dirname, './dist');
const PUBLIC_DIR = path.join(__dirname, './public');

module.exports = {
  mode,
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  devServer: {
    hot: true,
    host: 'localhost',
    port: 5500,
    historyApiFallback: true,
  },
  output: {
    filename: '[name].js',
    path: DIST_DIR,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'cornerstone-wado-image-loader':
        'cornerstone-wado-image-loader/dist/dynamic-import/cornerstoneWADOImageLoader.min.js',
    },
    fallback: {
      stream: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(bin|glb|gltf)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: {
                  'primary-color': '#00E0C7',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: './[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_APIKEY': JSON.stringify(
        process.env.REACT_APP_APIKEY
      ),
      'process.env.REACT_APP_AUTH_DOMAIN': JSON.stringify(
        process.env.REACT_APP_AUTH_DOMAIN
      ),
      'process.env.REACT_APP_PROJECT_ID': JSON.stringify(
        process.env.REACT_APP_PROJECT_ID
      ),
      'process.env.REACT_APP_STORAGE_BUCKET': JSON.stringify(
        process.env.REACT_APP_STORAGE_BUCKET
      ),
      'process.env.REACT_APP_MESSAGE_SENDER_ID': JSON.stringify(
        process.env.REACT_APP_MESSAGE_SENDER_ID
      ),
      'process.env.REACT_APP_APP_ID': JSON.stringify(
        process.env.REACT_APP_APP_ID
      ),
      'process.env.REACT_APP_MEASUREMENT_ID': JSON.stringify(
        process.env.REACT_APP_MEASUREMENT_ID
      ),
      'process.env.ENTRY_CODE': JSON.stringify(process.env.ENTRY_CODE),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'production' ? '' : '[DEV]',
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? { collapseWhitespace: true, removeComments: true }
          : false,
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './node_modules/cornerstone-wado-image-loader/dist/dynamic-import',
          to: DIST_DIR,
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src/service-worker.ts',
      swDest: 'service-worker.js',
      maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
    }),
    new WebpackManifestPlugin({
      filename: './public/manifest.json',
      basePath: path.join(__dirname, './dist'),
    }),
  ],
};
