import { registerHelper } from '@ember/test';
import { _enableFeature } from '../-private/enable-feature';
import { deprecate } from '@ember/debug';

registerHelper('withFeature', function withFeature(app, featureName) {
  deprecate(
    'The `withFeature` test helper is deprecated. Please use the `enableFeature` test helper instead with modern Ember testing syntax. See https://github.com/kategengler/ember-feature-flags#enablefeature--disablefeature',
    false,
    {
      id: 'ember-feature-flags.with-feature',
      until: '7.0.0',
      for: 'ember-feature-flags',
      since: {
        enabled: '6.1.0'
      }
    }
  );
  _enableFeature(app.__deprecatedInstance__, featureName);
});
