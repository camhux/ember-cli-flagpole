/* eslint-env es6, node, mocha */
const assert = require('chai').assert;

const bindFlagHelper = require('../../lib/flag');
const Registry = require('../../lib/-registry');
const Configurator = require('../../lib/configurator');


describe('ember-cli-flagpole', function() {
  let flag;
  let registry;

  beforeEach(() => {
    registry = new Registry();
    flag = bindFlagHelper(registry);
  });

  describe('flag helper', function() {
    it('should return a Configurator instance with corresponding name property', function() {
      const name = 'my cool feature flag';

      const out = flag(name);

      assert(out instanceof Configurator, 'return value should be an instance of Configurator');
      assert(out.name === name, 'configurator should have correct name property');
    });

    it('should throw a TypeError if name is something other than a string', function() {
      assert.throws(() => {
        flag(Symbol());
      }, TypeError);
    })

    // FIXME(camhux): Safety feature currently disabled because of Ember CLI's calling of `config`
    // multiple times per build, ensuring this error is always thrown. Possible to fix using a runtime
    // token inserted with the flag into the registry, but adds complexity.
    xit('should throw an Error if it has already been called with an identical name', function() {
      const name = 'my really cool feature flag';

      flag(name);

      assert.throws(() => {
        flag(name);
      }, Error);
    });
  });

  describe('base functionality', function() {
    const features = {
      A: 'my cool feature A',
      B: 'my cool feature B',
      C: 'my cool feature C',
    };

    const stg = 'stg';
    const prod = 'prod';

    it('should allow configuring a set of flags and retrieving a flattened set per environment', function() {
      flag(features.A)
        .env(stg, true)
        .env(prod, false);

      flag(features.B)
        .env(stg, true)
        .env(prod, true);

      flag(features.C)
        .default(true)
        .env(prod, false);

      const stgFlags = registry.collectFor(stg);
      const prodFlags = registry.collectFor(prod);

      assert.deepEqual(stgFlags, {
        [features.A]: true,
        [features.B]: true,
        [features.C]: true,
      }, 'stgFlags should be correct');

      assert.deepEqual(prodFlags, {
        [features.A]: false,
        [features.B]: true,
        [features.C]: false,
      }, 'prodFlags should be correct');
    });
  })
});
