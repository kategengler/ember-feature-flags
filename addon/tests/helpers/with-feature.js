import Ember from 'ember';
import features from 'ember-feature-flags/features';

export function withFeature( featureName ){
  features.enable(featureName);
}
export function withFeatures( featureName ){
  features.assign(featureName);
}

Ember.Test.registerHelper( 'withFeature', function ( app, featureName ) {
  withFeature( featureName );
});

Ember.Test.registerHelper( 'withFeatures', function ( app, features ) {
  withFeatures(features);
});
