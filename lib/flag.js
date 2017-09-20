/* eslint-env node */
'use strict';

const Configurator = require('./configurator');

// const has = Object.prototype.hasOwnProperty;

module.exports = function bindFlagHelper(registry) {
  return function flag(label) {
    if (typeof label !== 'string') {
      throw new TypeError('A feature flag label must be a string');
    }

    // FIXME(camhux): Ember CLI calls the wrapping hook multiple times, so this
    // always throws. This safety feature could be reenabled eventually by tokenizing
    // each instance of `flag()` and inserting the token into the registry.
    // if (has.call(registry, label)) {
    //   throw new Error(`A feature flag with ${label} was declared twice`);
    // }

    const handle = registry[label] = {
      environments: {}
    };

    return new Configurator(handle, label);
  };
};
