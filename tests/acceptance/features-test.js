import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';
import {withFeature} from 'ember-feature-flags/tests/helpers/with-feature';

var App;

module('Acceptance: Features', {
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('features are defined in app config', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.feature-from-config-on').length, 1, '.feature-from-config-on should be in dom');
    assert.equal(find('.feature-from-config-off').length, 0, '.feature-from-config-off should not be in dom');
  });
});

test('visiting / with acceptance-feature on', function(assert) {
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
  visit('/');

  andThen(function() {
    assert.equal(find('.acceptance-feature-on').length, 0, 'Acceptance feature on div should not be in dom');
    assert.equal(find('.acceptance-feature-off').length, 1, 'Acceptance feature off div should be in dom');
  });
});
