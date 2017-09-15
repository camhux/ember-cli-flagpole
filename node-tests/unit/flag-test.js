/* eslint-env node, mocha */
const assert = require('chai').assert;

const flag = require('../../lib/flag');
const Configurator = require('../../lib/configurator');

describe('flag helper', function() {
  it('should return a Configurator instance with corresponding name property', function() {
    const name = 'my cool feature flag';

    const out = flag(name);

    assert(out instanceof Configurator, 'return value should be an instance of Configurator');
    assert(out.name === name, 'configurator should have correct name property');
  });
});
