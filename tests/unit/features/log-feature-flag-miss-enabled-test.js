import {
  test, module
} from 'qunit';
import Features from 'ember-feature-flags/features';
import Ember from "ember";

var features, origENV;

module('Features - reading from ENV', {
  setup: function(){
    origENV = window.ENV;
    features = Features.create();
  },
  teardown: function(){
    if (features) {
      Ember.run(features, 'destroy');
    }
    window.ENV = origENV;
  }
});

test('logFeatureFlagMissEnabled is false by default', function(assert) {
  assert.equal(features.logFeatureFlagMissEnabled(), false,
    'Logging should be disabled without LOG_FEATURE_FLAG_MISS flag set');
});

test('logFeatureFlagMissEnabled is true when LOG_FEATURE_FLAG_MISS true', function(assert) {
  window.ENV = {LOG_FEATURE_FLAG_MISS: true};
  assert.equal(features.logFeatureFlagMissEnabled(), true,
    'Logging should be enabled with LOG_FEATURE_FLAG_MISS set to true');
});

test('logFeatureFlagMissEnabled is false when LOG_FEATURE_FLAG_MISS false', function(assert) {
  window.ENV = {LOG_FEATURE_FLAG_MISS: false};
  assert.equal(features.logFeatureFlagMissEnabled(), false,
    'Logging should be disabled with LOG_FEATURE_FLAG_MISS set to false');
});
