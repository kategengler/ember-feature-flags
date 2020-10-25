import { registerHelper } from '@ember/test';
import { _enableFeature } from '../-private/toggle-feature';

registerHelper('withFeature', function withFeature(app, featureName) {
  _enableFeature(app.__deprecatedInstance__, featureName);
});
