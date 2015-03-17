import Ember from 'ember';

export function withFeature ( app, featureName ) {
  var featuresService = app.__container__.lookup('features:-main');
  featuresService.enable(featureName);
}

Ember.Test.registerHelper( 'withFeature', withFeature );
