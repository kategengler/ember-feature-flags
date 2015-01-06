import Ember from 'ember';
import features from 'ember-feature-flags/features';

export function withFeature( featureName ){
  features.set(featureName, true);
}

Ember.Test.registerHelper( 'withFeature', function ( app, featureName ) {
  withFeature( featureName );
});
