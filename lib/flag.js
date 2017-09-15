/* eslint-env node */
const Configurator = require('./configurator');

const has = Object.prototype.hasOwnProperty;

const registry = require('./-registry');

const flag = function(label) {
  if (typeof label !== 'string') {
    throw new TypeError('A feature flag label must be a string');
  }

  if (has.call(registry, label)) {
    throw new Error(`A feature flag with ${label} was declared twice`);
  }

  registry[label] = {};

  return new Configurator(registry, label);
};

module.exports = flag;
