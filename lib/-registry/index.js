/* eslint-env node */

class Registry {
  collectFor(environment) {
    const flags = Object.keys(this);
    const flattened = {};

    flags.forEach(flag => {
      if (this[flag].default != null) {
        flattened[flag] = this[flag].default;
      }

      if (this[flag].environments[environment] != null) {
        flattened[flag] = this[flag].environments[environment];
      }
    });

    return flattened;
  }
}

module.exports = Registry;
