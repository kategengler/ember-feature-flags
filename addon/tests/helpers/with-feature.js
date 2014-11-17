import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export function withFeature( featureName ){
  set(window, 'Features', get(window, 'Features') || {});
  set(get(window, 'Features'), featureName, true);
}

Ember.Test.registerHelper( 'withFeature', function ( app, featureName ) {
  withFeature( featureName );
});
