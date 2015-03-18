import Ember from 'ember';

export function resetFeatureFlags (app) {
  Ember.deprecate('[ember-feature-flags] resetFeatureFlags is no longer needed before each test execution, and will be removed');
  var featuresService = app.__container__.lookup('features:-main');
  featuresService.setup({});
}

Ember.Test.registerHelper( 'resetFeatureFlags', resetFeatureFlags );
