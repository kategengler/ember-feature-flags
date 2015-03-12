import {
  test, module
} from 'qunit';
import features from 'ember-feature-flags/features';

module('features:main');

test('logFeatureFlagMissEnabled', function(assert) {
  var origENV = window.ENV;

  window.ENV = {};
  assert.equal(features.logFeatureFlagMissEnabled(), false,
    'Logging should be disabled without LOG_FEATURE_FLAG_MISS flag set');

  window.ENV = {
    LOG_FEATURE_FLAG_MISS: true
  };
  assert.equal(features.logFeatureFlagMissEnabled(), true, 'Logging should be enabled with LOG_FEATURE_FLAG_MISS set to true');

  window.ENV = {
    LOG_FEATURE_FLAG_MISS: false
  };
  assert.equal(features.logFeatureFlagMissEnabled(), false,
    'Logging should be disabled with LOG_FEATURE_FLAG_MISS set to false');

  window.ENV = origENV;
});

test('featureIsEnabled', function(assert) {
  var origFeatures = features.flags;

  features.setup(undefined);
  assert.equal(features.featureIsEnabled('some-feature'), false, 'Feature is false if Features is undefined');

  features.setup({});
  assert.equal(features.featureIsEnabled('some-feature'), false, 'Feature is false if Feature on Features is undefined');

  features.setup({"some-feature": true});
  assert.equal(features.featureIsEnabled('some-feature'), true, 'Feature is true if feature is set to true');

  features.setup({"some-feature": false});
  assert.equal(features.featureIsEnabled('some-feature'), false, 'Feature is false if feature is set to false');

  features.setup(origFeatures);
});

test('unknownProperties', function(assert) {
  features.setup({
    'some-new-feature': true,
    'other-newThing': false,
    'something.other-thing': true
  });

  assert.equal(true, features.get('someNewFeature'), 'Should be available on features');
  assert.equal(false, features.get('otherNewThing'), 'Should be available on features');
  assert.equal(true, features.get('somethingOtherThing'), 'Should be available on features');

  assert.throws(function(){
    features.set('someNewFeature');
  }, /use enable/, "Throws an error when setting an unknownProperty");
});
