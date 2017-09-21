/* eslint-env node */
'use strict';

class Registry {
  collectFor(environment, options = {}) {
    const flags = Object.keys(this);
    const flattened = {};

    flags.forEach(flag => {
      const flagDefault = this[flag].default;
      const flagEnvSetting = this[flag].environments[environment];

      const setting = flagEnvSetting == null ? !!flagDefault : flagEnvSetting;

      if (!(options.omitFalseFlags && !setting)) {
        flattened[flag] = setting;
      }
    });

    return flattened;
  }
}

module.exports = Registry;
