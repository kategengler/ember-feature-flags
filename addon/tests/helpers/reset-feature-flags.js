import Ember from 'ember';

export function resetFeatureFlags(){
  window.Features = {};
}

Ember.Test.registerHelper( 'resetFeatureFlags', function () {
  resetFeatureFlags();
});
