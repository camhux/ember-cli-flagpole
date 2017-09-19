/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-flagpole',

  flagpoleConfigPath: 'config/flagpole',

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

    const resolved = resolve(projectRoot, this.flagpoleConfigPath);

    if (existsSync(resolved + '.js')) {
      require(resolved)(this.flag);

      return {
        featureFlags: this._flagRegistry.collectFor(env)
      };
    }

    return { featureFlags: 'DEBUG_NONE' };
  },

  includedCommands() {
    return {
      'audit-flags': require('./lib/commands/audit-flags'),
    };
  },
};
