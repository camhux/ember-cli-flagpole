/* eslint-env node */
const Configurator = require('./configurator');

const has = Object.prototype.hasOwnProperty;

module.exports = function bindFlagHelper(registry) {
  return function flag(label) {
    if (typeof label !== 'string') {
      throw new TypeError('A feature flag label must be a string');
    }

    if (has.call(registry, label)) {
      throw new Error(`A feature flag with ${label} was declared twice`);
    }

    registry[label] = {
      environments: {}
    };

    return new Configurator(registry, label);
  };
};
