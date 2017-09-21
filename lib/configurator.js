/* eslint-env node */
'use strict';

const has = Object.prototype.hasOwnProperty;

class Configurator {
  constructor(handle, name) {
    this.name = name;
    this.handle = handle;

    if (this.handle == null) {
      throw new Error(
        'null handle in registry while constructing configurator:\n' +
        'Flag name:' + name``
      );
    }
  }

  default(bool) {
    if (has.call(this.handle, 'default')) {
      throw new Error(`default for flag ${this.name} defined twice`);
    }

    this.handle.default = bool;

    return this;
  }

  env(environment, bool) {
    if (environment === '' || environment == null) {
      throw new TypeError(`attempted to configure flag ${this.name} for empty environment: ${environment}`);
    }

    if (typeof bool !== 'boolean') {
      throw new TypeError(`flag().env() should be set with a strict boolean`);
    }

    if (has.call(this.handle.environments, environment)) {
      throw new Error(`feature flag ${this.name} defined twice for environment ${environment}`);
    }

    this.handle.environments[environment] = bool;

    return this;
  }
}

module.exports = Configurator;
