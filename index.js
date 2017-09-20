/* eslint-env node */
'use strict';

const DEFAULT_CFG_PATH = 'config/flagpole';
const DEFAULT_CFG_PROPERTY = 'featureFlags';

module.exports = {
  name: 'ember-cli-flagpole',

  flagpoleConfigPath: DEFAULT_CFG_PATH,
  flagpolePropertyName: DEFAULT_CFG_PROPERTY,
  flagpoleOmitFalseFlags: false,

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    const Registry = require('./lib/-registry');

    this._flagRegistry = new Registry();
    this.flag = require('./lib/flag')(this._flagRegistry);
  },

  included(app) {
    const options = app.options['ember-cli-flagpole'] || {};
    // TODO(camhux): Safely strip `.js` extension from custom config path
    this.flagpoleConfigPath = options.configPath || DEFAULT_CFG_PATH;
    this.flagpolePropertyName = options.propertyName || DEFAULT_CFG_PROPERTY;
    this.flagpoleOmitFalseFlags = !!options.omitFalseFlags;
  },

  config(env/* , baseConfig */) {
    const resolve = require('path').resolve;
    const existsSync = require('fs').existsSync;

    // TODO: support use as a nested addon?
    const projectRoot = this.project.root;
    // TODO: check for custom path to flagpole.js

    const resolved = resolve(projectRoot, this.flagpoleConfigPath);

    if (existsSync(resolved + '.js')) {
      require(resolved)(this.flag);

      return {
        [this.flagpolePropertyName]: this._flagRegistry.collectFor(env, { omitFalseFlags: this.omitFalseFlags })
      };
    }

    return { [this.flagpolePropertyName]: 'DEBUG_NONE' };
  },

  includedCommands() {
    return {
      'audit-flags': require('./lib/commands/audit-flags'),
    };
  },
};
