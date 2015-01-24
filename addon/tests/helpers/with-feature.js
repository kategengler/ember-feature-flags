import Ember from 'ember';
import features from 'ember-feature-flags/features';

export function withFeature( featureName ){
  features.enable(featureName);
}

Ember.Test.registerHelper( 'withFeature', function ( app, featureName ) {
  withFeature( featureName );
});
