import Ember from 'ember';

export function withFeature( featureName ){
  window.Features = window.Features || {};
  window.Features[featureName] = true;
}

Ember.Test.registerHelper( 'withFeature', function ( app, featureName ) {
  withFeature( featureName );
});
