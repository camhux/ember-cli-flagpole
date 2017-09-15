/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-flagpole',

  config: function(env/* , baseConfig */) {
    const resolve = require('path').resolve;

    // TODO: check options/overrides?

    const projectRoot = this.project.getProjectRoot();
    // TODO: check for custom path to flagpole.js
    const flagpoleConfigPath = 'app/config/flagpole';


    require(resolve(projectRoot, flagpoleConfigPath));

    return {
      featureFlags: require('./lib/-registry').collectFor(env)
    };
  },

  flag: require('./lib/flag')
};
