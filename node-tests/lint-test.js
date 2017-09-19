/* eslint-env node */
const eslint = require('mocha-eslint');

eslint([
  'addon',
  'app',
  'lib',
  'node-tests',
  'tests'
]);
