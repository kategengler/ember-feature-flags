import Features from 'ember-feature-flags/services/features';
import config from '../config/environment';

export default class extends Features {
  config = config;

  constructor() {
    super(...arguments);

    if (config.featureFlags) {
      this.setup(config.featureFlags);
    }
  }
}
