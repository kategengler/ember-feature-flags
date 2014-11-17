import {
  ff
  } from 'ember-feature-flags/helpers/ff';
import { withFeature } from 'ember-feature-flags/tests/helpers/with-feature';
import { withoutFeature } from 'ember-feature-flags/tests/helpers/without-feature';

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

test('it is bound to the Features object and updates when the feature is toggled on/off', function() {
  expect(1);
  var trueCount = 0;
  var falseCount = 0;

  function t() {
    trueCount++;
  }

  function f() {
    falseCount++;
  }

  var options = {
    fn: t,
    inverse: f
  };

  // Feature on
  withFeature('some-feature');
  ff('some-feature', options);

  equal(trueCount, 1, 'true fn called once');
  equal(falseCount, 0, 'false inverse fn not called');

  // Feature off
  withoutFeature('some-feature');

  equal(trueCount, 1, 'true fn called once');
  equal(falseCount, 1, 'false inverse fn called once');
});
