import {
  test
} from 'ember-qunit';
import features from 'ember-feature-flags/features';

module('features:main');

test('logFeatureFlagMissEnabled', function() {
  var origENV = window.ENV;

  window.ENV = {};
  equal(features.logFeatureFlagMissEnabled(), false,
    'Logging should be disabled without LOG_FEATURE_FLAG_MISS flag set');

  window.ENV = {
    LOG_FEATURE_FLAG_MISS: true
  };
  equal(features.logFeatureFlagMissEnabled(), true, 'Logging should be enabled with LOG_FEATURE_FLAG_MISS set to true');

  window.ENV = {
    LOG_FEATURE_FLAG_MISS: false
  };
  equal(features.logFeatureFlagMissEnabled(), false,
    'Logging should be disabled with LOG_FEATURE_FLAG_MISS set to false');

  window.ENV = origENV;
});

test('featureIsEnabled', function() {
  var origFeatures = features.flags;

  features.setup(undefined);
  equal(features.featureIsEnabled('some-feature'), false, 'Feature is false if Features is undefined');

  features.setup({});
  equal(features.featureIsEnabled('some-feature'), false, 'Feature is false if Feature on Features is undefined');

  features.setup({"some-feature": true});
  equal(features.featureIsEnabled('some-feature'), true, 'Feature is true if feature is set to true');

  features.setup({"some-feature": false});
  equal(features.featureIsEnabled('some-feature'), false, 'Feature is false if feature is set to false');

  features.setup(origFeatures);
});

test('unknownProperties', function(){
  features.setup({
    'some-new-feature': true,
    'other-newThing': false,
    'something.other-thing': true
  });

  equal(true, features.get('someNewFeature'), 'Should be available on features');
  equal(false, features.get('otherNewThing'), 'Should be available on features');
  equal(true, features.get('somethingOtherThing'), 'Should be available on features');

  throws(function(){
    features.set('someNewFeature');
  }, /use enable/, "Throws an error when setting an unknownProperty");
});
