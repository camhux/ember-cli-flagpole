/* eslint-env node */
'use strict';

const Configurator = require('./configurator');

// const has = Object.prototype.hasOwnProperty;

module.exports = function bindFlagHelper(registry) {
  return function flag(name) {
    if (typeof name !== 'string') {
      throw new TypeError('A feature flag name must be a string');
    }

    // FIXME(camhux): Ember CLI calls the wrapping hook multiple times, so this
    // always throws. This safety feature could be reenabled eventually by tokenizing
    // each instance of `flag()` and inserting the token into the registry.
    // if (has.call(registry, name)) {
    //   throw new Error(`A feature flag with ${name} was declared twice`);
    // }

    const handle = registry[name] = {
      environments: {}
    };

    return new Configurator(handle, name);
  };
};
