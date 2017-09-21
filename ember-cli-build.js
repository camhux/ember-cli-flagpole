/* eslint-env node */
'use strict';

// (camhux): This build file will switch between reading different dummy flagpole configs in order to
// perform acceptance tests in a variety of addon-config situations (i.e., modulating build parameters).

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let flagpoleAcceptanceCase = process.env['FLAGPOLE_ACCEPTANCE_CASE'];
  if (!flagpoleAcceptanceCase) {
    flagpoleAcceptanceCase = 'function-config';
  }

  const options = require(`./tests/acceptance-cases/${flagpoleAcceptanceCase}`).options;
  let app = new EmberAddon(defaults, {
    'ember-cli-flagpole': {
      configPath: options.configPath,
      omitFalseFlags: options.omitFalseFlags
    }
  });

  return app.toTree();
};
