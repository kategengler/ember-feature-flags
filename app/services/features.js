import Features from 'ember-feature-flags/services/features';
import config from '../config/environment';

export default Features.extend({
  config,
  init() {
    this._super(...arguments);

    if (this.application && !Ember.isNone(this.application.FEATURES)) {
      Ember.deprecate('[ember-feature-flags] Setting feature flags via `APP.FEATURES` is deprecated and will be removed.');
      this.setup(this.application.FEATURES);
    } else if (config.featureFlags) {
      this.setup(config.featureFlags);
    }
  }

});
