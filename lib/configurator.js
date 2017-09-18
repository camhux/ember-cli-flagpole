/* eslint-env node */

const has = Object.prototype.hasOwnProperty;

class Configurator {
  constructor(registry, label) {
    this.name = label;
    this.handle = registry[label];

    if (this.handle == null) {
      throw new Error(
        'null handle in registry while constructing configurator:\n' +
        'Flag name:' + label``
      );
    }
  }

  default(bool) {
    if (has.call(this.handle, 'default')) {
      throw new Error(`default for flag ${this.label} defined twice`);
    }

    this.handle.default = bool;

    return this;
  }

  env(environment, bool) {
    if (environment === '' || environment == null) {
      throw new TypeError(`attempted to configure flag ${this.label} for empty environment: ${environment}`);
    }

    if (has.call(this.handle.environments, environment)) {
      throw new Error(`feature flag ${this.label} defined twice for environment ${environment}`);
    }

    this.handle.environments[environment] = bool;

    return this;
  }
}

module.exports = Configurator;
