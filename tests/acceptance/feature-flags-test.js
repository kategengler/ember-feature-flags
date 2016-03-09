import Ember from 'ember';
import { test } from 'qunit';
import startApp from '../helpers/start-app';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import config from "dummy/config/environment";

var oldDeprecate, oldFeatureFlags;

moduleForAcceptance('Acceptance | feature flags', {
  beforeEach() {
    oldDeprecate = Ember.deprecate;
    oldFeatureFlags = config.featureFlags;
  },
  afterEach() {
    Ember.deprecate = oldDeprecate;
    config.featureFlags = oldFeatureFlags;
  }
});

test('features are defined in config on featureFlags', function(assert) {
  assert.expect(2);
  config.featureFlags = {
    'feature-from-config': true
  };
  this.application = startApp();
  visit('/');

  andThen(function() {
    assert.equal(find('.feature-from-config-on').length, 1, '.feature-from-config-on should be in dom');
    assert.equal(find('.feature-from-config-off').length, 0, '.feature-from-config-off should not be in dom');
  });
});

test('features are defined in app config [DEPRECATED]', function(assert) {
  assert.expect(3);
  this.application = startApp({
    FEATURES: {
      'featureFromConfig': true
    }
  });
  Ember.deprecate = function(message){
    if (message === '[ember-feature-flags] Setting feature flags via `APP.FEATURES` is deprecated and will be removed.') {
      assert.ok(true, 'deprecation called');
    }
  };
  visit('/');

  andThen(function() {
    assert.equal(find('.feature-from-config-on').length, 1, '.feature-from-config-on should be in dom');
    assert.equal(find('.feature-from-config-off').length, 0, '.feature-from-config-off should not be in dom');
  });
});

test('visiting / with acceptance-feature on', function(assert) {
  this.application = startApp();
  withFeature('acceptance-feature');
  visit('/');

  andThen(function() {
    assert.equal(find('.acceptance-feature-on').length, 1, 'Acceptance feature on div should be in dom');
    assert.equal(find('.acceptance-feature-off').length, 0, 'Acceptance feature off div should not be in dom');
  });

  click('.test-turn-acceptance-off');

  andThen(function(){
    assert.equal(find('.acceptance-feature-on').length, 0, 'Acceptance feature on div should not be in dom');
    assert.equal(find('.acceptance-feature-off').length, 1, 'Acceptance feature off div should be in dom');
  });
});

test('visiting / with no features set', function(assert) {
  this.application = startApp();
  visit('/');

  andThen(function() {
    assert.equal(find('.acceptance-feature-on').length, 0, 'Acceptance feature on div should not be in dom');
    assert.equal(find('.acceptance-feature-off').length, 1, 'Acceptance feature off div should be in dom');
  });
});
