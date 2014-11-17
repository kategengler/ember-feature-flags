import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export function withoutFeature(featureName) {
  set(window, 'Features', get(window, 'Features') || {});
  set(get(window, 'Features'), featureName, false);
}

Ember.Test.registerHelper('withoutFeature', function (app, featureName) {
  withoutFeature(featureName);
});
