import Ember from 'ember';
import features from 'ember-feature-flags/features';

export function resetFeatureFlags(){
  features.setup({});
}

Ember.Test.registerHelper( 'resetFeatureFlags', function () {
  resetFeatureFlags();
});
