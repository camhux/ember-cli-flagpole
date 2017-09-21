import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import config from 'dummy/config/environment';

moduleForAcceptance('Acceptance | flagpole');

test('flags expressed in post-build config/environment', function(assert) {
  assert.ok(config.featureFlags, 'featureFlags property should have been defined');

  if (config.isTestingOmitFalseFlags) {
    assert.deepEqual(config.featureFlags, {
      alwaysTrue: true,
      trueInTest: true
    }, 'correct values for each flag defined');
  } else {
    assert.deepEqual(config.featureFlags, {
      alwaysTrue: true,
      alwaysFalse: false,
      trueInTest: true
    }, 'correct values for each flag defined');
  }
});
