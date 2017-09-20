/* eslint-env node */
'use strict';

const Registry = require('../registry');
const bindFlagHelper = require('../flag');

const resolve = require('path').resolve;
const existsSync = require('fs').existsSync;

const has = Object.prototype.hasOwnProperty;

module.exports = {
  name: 'audit-flags',
  description: 'Print an itemized list of feature flags that are configured using `ember-cli-flagpole`.',

  works: 'insideProject',

  run() {
    const registry = new Registry();
    const flag = bindFlagHelper(registry);

    const projectRoot = this.project.root;

    // FIXME(camhux): Use `this.app.options` to read config path,
    // or otherwise refactor to a single source of truth at addon root.
    const resolved = resolve(projectRoot, 'config/flagpole');

    if (!existsSync(resolved + '.js')) {
      throw new Error('A flagpole.js configuration file must exist to audit flags using `ember-cli-flagpole`');
    }

    require(resolved)(flag);

    const featureNames = Object.keys(registry);

    featureNames.forEach((name) => {
      const handle = registry[name];
      this.ui.write(`- ${name}:\n`);

      if (has.call(handle, 'default')) {
        this.ui.write(`  default: ${handle.default}\n`);
      }

      Object.keys(handle.environments).forEach((env) => {
        this.ui.write(`  ${env}: ${handle.environments[env]}\n`);
      });
    });
  },
};
