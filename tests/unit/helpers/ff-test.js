import {
  ff
  } from 'ember-feature-flags/helpers/ff';
import { withFeature } from 'ember-feature-flags/tests/helpers/with-feature';

module('Feature Flag Helper', {
  teardown: function() {
    window.Features = {};
  }
});

test('it calls the true case when feature is on', function() {
  expect(1);
  withFeature('some-feature');
  function t() {
    ok(true, 'This function should be called');
  }

  function f() {
    ok(false, 'This function should not be called');
  }

  var options = {
    fn: t,
    inverse: f
  };

  ff('some-feature', options);
});

test('it calls the true case when feature is off', function() {
  expect(1);
  function t() {
    ok(false, 'This function should not be called');
  }

  function f() {
    ok(true, 'This function should be called');
  }

  var options = {
    fn: t,
    inverse: f
  };

  ff('some-feature', options);
});

