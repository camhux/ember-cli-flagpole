/* eslint-env node */
'use strict';

const has = Object.prototype.hasOwnProperty;

module.exports = function convertObject(flag, sourceObj) {
  const names = Object.keys(sourceObj);

  names.forEach(name => {
    const configurator = flag(name);
    const handle = sourceObj[name];

    if (has.call(handle, 'default')) {
      configurator.default(handle.default);
    }

    if (has.call(handle, 'environments')) {
      Object.keys(handle.environments).forEach(environment => {
        const setting = handle.environments[environment];
        configurator.env(environment, setting);
      });
    }
  });
};
