import Ember from 'ember';

export function withoutFeature(app, featureName) {
  let featuresService = app.__container__.lookup('service:features');
  featuresService.disable(featureName);
}

Ember.Test.registerHelper('withoutFeature', withoutFeature);
