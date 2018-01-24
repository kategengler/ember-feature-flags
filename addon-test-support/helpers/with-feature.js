import { registerHelper } from '@ember/test';

export function withFeature(app, featureName) {
  let featuresService = app.__container__.lookup('service:features');
  featuresService.enable(featureName);
}

registerHelper('withFeature', withFeature);
