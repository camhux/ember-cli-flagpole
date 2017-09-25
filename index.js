/* eslint-env node */
'use strict';

const DEFAULT_CFG_PATH = 'config/flagpole';
const DEFAULT_PROPERTY_NAME = 'featureFlags';

module.exports = {
  name: 'ember-cli-flagpole',

  flagpoleConfigPath: DEFAULT_CFG_PATH,
  flagpolePropertyName: DEFAULT_PROPERTY_NAME,
  flagpoleOmitFalseFlags: false,

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    const Registry = require('./lib/registry');

    this._flagRegistry = new Registry();
    this.flag = require('./lib/flag')(this._flagRegistry);
  },

  included(app) {
    const options = app.options['ember-cli-flagpole'] || {};

    if (options.configPath) {
      this.flagpoleConfigPath = options.configPath.replace(/\.js$/, '');
    }

    if (options.propertyName) {
      this.flagpolePropertyName = options.propertyName;
    }

    this.flagpoleOmitFalseFlags = !!options.omitFalseFlags;
  },

  config(env/* , baseConfig */) {
    const resolve = require('path').resolve;
    const existsSync = require('fs').existsSync;

    // TODO: support use as a nested addon?
    const projectRoot = this.project.root;

    const resolved = resolve(projectRoot, this.flagpoleConfigPath);

    if (existsSync(resolved + '.js')) {
      const flagpoleConfig = require(resolved);

      switch (typeof flagpoleConfig) {
        case 'object': {
          require('./lib/convert-object')(this.flag, flagpoleConfig);
          break;
        }
        case 'function': {
          flagpoleConfig(this.flag);
          break;
        }
        default: throw new TypeError('flagpole.js must export either a function or an object');
      }

      const flagSet = this._flagRegistry.collectFor(env, {
        omitFalseFlags: this.flagpoleOmitFalseFlags
      });

      return {
        [this.flagpolePropertyName]: flagSet
      };
    }

    return {};
  },
};
