'use strict';

// import dependencies
const path = require('path');
const merge = require('lodash.merge');

// get script arguments
const argv = require('yargs').argv;

// getting configuration object builders
const getDefaultConfig = require('./config');
const getLocalConfig = (() => {
  try {
    return require('./config.local');
  } catch (e) {
    return null;
  }
})();

// build the configuration object
const defaultConfig = typeof getDefaultConfig === 'function' ? getDefaultConfig() : getDefaultConfig;
const localConfig = typeof getLocalConfig === 'function' ? getLocalConfig() : getLocalConfig;
const config = merge({}, defaultConfig, localConfig);

// export paths to files
const runtime = path.join(__dirname, 'runtime');
module.exports.pathToRuntime = runtime;
for (let i in config.paths) {
  module.exports[i] = config.paths[i]
    .replace('@root', __dirname)
    .replace('@runtime', runtime);
}

// export instances
module.exports.params = argv;
module.exports.config = config;
for (let name in config.components) {
  const component = config.components[name];
  const instance = new component.constructor(component);
  module.exports[name] = instance;
}
