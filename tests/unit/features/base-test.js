import {
  test, module
} from 'qunit';
import Features from 'ember-feature-flags/features';
import Ember from "ember";

var features, oldDeprecate;

module('Features', {
  setup: function(){
    oldDeprecate = Ember.deprecate;
    features = Features.create();
  },
  teardown: function(){
    if (features) {
      Ember.run(features, 'destroy');
    }
    Ember.deprecate = oldDeprecate;
  }
});

test('isEnabled', function(assert) {
  features.setup(undefined);
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if Features is undefined');

  features.setup({});
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if Feature on Features is undefined');

  features.setup({"some-feature": true});
  assert.equal(features.isEnabled('some-feature'), true, 'Feature is true if feature is set to true');

  features.setup({"some-feature": false});
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if feature is set to false');
});

test('enabled [DEPRECATED]', function(assert) {
  assert.expect(2);
  Ember.deprecate = function(){
    assert.ok(true, 'deprecation called');
  };
  features.setup(undefined);
  assert.equal(features.enabled('some-feature'), false, 'Feature is false if Features is undefined');
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
