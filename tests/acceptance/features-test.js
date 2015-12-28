import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';
import {withFeature} from 'ember-feature-flags/tests/helpers/with-feature';
import config from "dummy/config/environment";

var App, oldDeprecate, oldFeatureFlags;

module('Acceptance: Features', {
  beforeEach: function() {
    oldDeprecate = Ember.deprecate;
    oldFeatureFlags = config.featureFlags;
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    Ember.deprecate = oldDeprecate;
    config.featureFlags = oldFeatureFlags;
  }
});

test('features are defined in config on featureFlags', function(assert) {
  assert.expect(2);
  config.featureFlags = {
    'feature-from-config': true
  };
  App = startApp();
  visit('/');

  andThen(function() {
    assert.equal(find('.feature-from-config-on').length, 1, '.feature-from-config-on should be in dom');
    assert.equal(find('.feature-from-config-off').length, 0, '.feature-from-config-off should not be in dom');
  });
});

test('features are defined in app config [DEPRECATED]', function(assert) {
  assert.expect(3);
  App = startApp({
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
  App = startApp();
  withFeature(App, 'acceptance-feature');
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
  App = startApp();
  visit('/');

  andThen(function() {
    assert.equal(find('.acceptance-feature-on').length, 0, 'Acceptance feature on div should not be in dom');
    assert.equal(find('.acceptance-feature-off').length, 1, 'Acceptance feature off div should be in dom');
  });
});

test('visiting / with acceptance-feature on and calling setup properly updates flags', function(assert) {
  App = startApp();
  withFeature(App, 'acceptance-feature');
  visit('/');

  andThen(function() {
    assert.equal(find('.acceptance-feature-on').length, 1, 'Acceptance feature on div should be in dom');
    assert.equal(find('.acceptance-feature-off').length, 0, 'Acceptance feature off div should not be in dom');
  });

  click('.test-turn-acceptance-setup-off');

  andThen(function(){
    assert.equal(find('.acceptance-feature-on').length, 0, 'Acceptance feature on div should not be in dom');
    assert.equal(find('.acceptance-feature-off').length, 1, 'Acceptance feature off div should be in dom');
  });
});