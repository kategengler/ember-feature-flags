import Ember from 'ember';
import startApp from '../helpers/start-app';
import { withFeature} from 'ember-feature-flags/tests/helpers/with-feature';

var App;

module('Acceptance: Features', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
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
