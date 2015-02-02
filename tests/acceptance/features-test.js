import Ember from 'ember';
import startApp from '../helpers/start-app';
import {withFeature} from 'ember-feature-flags/tests/helpers/with-feature';
import features from 'ember-feature-flags/features';

var App;

module('Acceptance: Features', {
  setup: function() {
    features.setup({});
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('features are defined in app config', function() {
  visit('/');

  andThen(function() {
    equal(find('.feature-from-config-on').length, 1, '.feature-from-config-on should be in dom');
    equal(find('.feature-from-config-off').length, 0, '.feature-from-config-off should not be in dom');
  });
});

test('visiting / with acceptance-feature on', function() {
  withFeature('acceptance-feature');
  visit('/');

  andThen(function() {
    equal(find('.acceptance-feature-on').length, 1, 'Acceptance feature on div should be in dom');
    equal(find('.acceptance-feature-off').length, 0, 'Acceptance feature off div should not be in dom');
  });
});

test('visiting / with no features set', function() {
  visit('/');

  andThen(function() {
    equal(find('.acceptance-feature-on').length, 0, 'Acceptance feature on div should not be in dom');
    equal(find('.acceptance-feature-off').length, 1, 'Acceptance feature off div should be in dom');
  });
});
