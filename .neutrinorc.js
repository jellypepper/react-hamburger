const { resolve } = require('path');
const react = require('@neutrinojs/react-components');
const babelMerge = require('babel-merge');
const Notifier = require('webpack-notifier');

const CONFIG = {
  react: {
    devServer: {
      port: 3000
    },
    style: {
      loaders: ['postcss-loader']
    }
  },
  cssModules: {
    importLoaders: 1,
    modules: {
      localIdentName: '[path]--[local]--[hash:base64:5]'
    }
  },
  babel: {
    plugins: [
      [
        'babel-plugin-react-css-modules',
        {
          generateScopedName: '[path]--[local]--[hash:base64:5]',
          webpackHotModuleReloading: process.env.NODE_ENV !== 'production'
        }
      ]
    ]
  },
  notifier: {
    skipFirstNotification: true
  }
};

module.exports = neutrino => {
  const { config } = neutrino;

  // Base setup
  neutrino.use(react(CONFIG.react));

  // Babel
  config.module
    .rule('compile')
    .use('babel')
    .tap(options => babelMerge(CONFIG.babel, options));

  // Patch HMR for node_modules
  config.module
    .rule('hot-loader')
    .test(/\.jsx?$/)
    .pre()
    .include.add(/node_modules/)
    .end()
    .use('hot-loader')
    .loader('react-hot-loader/webpack');

  // CSS modules
  config.module
    .rule('style')
    .oneOf('modules')
    .use('css')
    .tap(() => CONFIG.cssModules);

  // Development helpers
  config.plugin('notifier').use(Notifier, [CONFIG.notifier]);

  // Webpack config
  config.output.path(resolve('dist'));
};
