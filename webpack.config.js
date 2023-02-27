const webpack = require('webpack'); // TODO: Upgrade Webpack version?
const JavaScriptObfuscator = require('webpack-obfuscator');
const CopyPlugin = require('copy-webpack-plugin');
// TODO: Use dynamic-cdn-webpack-plugin?
const values = require('postcss-modules-values');
const autoprefixer = require('autoprefixer');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '.env') });

const _salt = Math.random();
const hash = (str) =>
  Array.from(str + _salt).reduce(
    (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
    0
  );

const devMode = process.env.NODE_ENV !== 'production';

// babel-plugin-react-css-modules and css-loader generated names must match
const generateScopedCSSName = (localName) => localName;
  // devMode
  //   ? localName + '_' // Tweak names in dev mode to make sure everything works
  //   : '_' + localName + '_' + hash(localName);

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'web',
  entry: './src/Embed.js',
  plugins: [
    new CopyPlugin({ patterns: [{ from: 'public', to: '.' }] }), // Copy index.html into dist/
    !devMode && new JavaScriptObfuscator(), // TODO: This DOUBLES the bundle size!!
    new webpack.EnvironmentPlugin(dotenv.parsed),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|webpack\.config\.js)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-transform-async-to-generator',
              '@babel/plugin-transform-runtime',
              [
                'babel-plugin-react-css-modules',
                {
                  webpackHotModuleReloading: true, // TODO: HMR doesn't actually work
                  autoResolveMultipleImports: true,
                  generateScopedName: generateScopedCSSName,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'to-string-loader',
          {
            loader: 'css-loader',
            options: {
              // TODO: Remove CSS modules? No longer needed with shadow DOM
              modules: {
                getLocalIdent: (_, __, localName, ___) =>
                  generateScopedCSSName(localName),
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: devMode,
              postcssOptions: { plugins: [autoprefixer(), values()] },
            },
          },
        ],
      },
      // TODO: Do we want to extract our CSS?
      // TODO: Minify/optimize CSS
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'leasemagnets.js',
    library: 'LeaseMagnets',
    libraryExport: 'default',
    libraryTarget: 'umd',
    // umdNamedDefine: true,
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
  },
  node: {
    fs: 'empty',
  },
};
