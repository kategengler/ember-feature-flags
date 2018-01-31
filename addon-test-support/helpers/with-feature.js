import { registerHelper } from '@ember/test';
import { enableFeature } from '../index';

registerHelper('withFeature', function withFeature(app, featureName) {
  enableFeature(app.__container__, featureName);
});
