const CONFIG = {
  presetEnv: {
    stage: 2
  }
};

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nesting'),
    require('postcss-custom-media'),
    require('postcss-preset-env')(CONFIG.presetEnv)
  ]
};
