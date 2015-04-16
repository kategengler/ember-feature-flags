import Ember from 'ember';

export function withoutFeature ( app, featureName ) {
  var featuresService = app.__container__.lookup('features:-main');
  featuresService.disable(featureName);
}

Ember.Test.registerHelper( 'withoutFeature', withoutFeature );
