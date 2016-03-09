import Features from 'ember-feature-flags/services/features';
import config from '../config/environment';

export default Features.extend({
  config,
  init() {
    this._super(...arguments);

    if (config.featureFlags) {
      this.setup(config.featureFlags);
    }
  }

});
