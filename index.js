/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-flagpole',

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    const Registry = require('./lib/-registry');

    this._flagRegistry = new Registry();
    this.flag = require('./lib/flag')(this._flagRegistry);
  },

  config: function(env/* , baseConfig */) {
    // TODO: check options/overrides in this.app.options
    const resolve = require('path').resolve;
    const existsSync = require('fs').existsSync;

    // TODO: support use as a nested addon?
    const projectRoot = this.project.root;
    // TODO: check for custom path to flagpole.js
    const flagpoleConfigPath = 'config/flagpole';

    const resolved = resolve(projectRoot, flagpoleConfigPath);

    if (existsSync(resolved + '.js')) {
      require(resolve(projectRoot, flagpoleConfigPath))(this.flag);

      return {
        featureFlags: this._flagRegistry.collectFor(env)
      };
    }

    return { featureFlags: 'DEBUG_NONE' };
  },
};
