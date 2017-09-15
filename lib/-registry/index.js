/* eslint-env node */

// TODO: remove this module-level statefulness. decouple stuff.
class Registry {
  collectFor(environment) {
    const flags = Object.keys(this);
    const flattened = {};

    flags.forEach(flag => {
      if (this[flag].default != null) {
        flattened[flag] = this[flag].default;
      }

      if (this[flag][environment] != null) {
        flattened[flag] = this[flag].default;
      }
    });

    return flattened;
  }
}

module.exports = new Registry();
