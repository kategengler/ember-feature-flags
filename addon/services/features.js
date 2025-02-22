/*eslint-disable no-extra-boolean-cast */
import Service from '@ember/service';
import { TrackedMap } from 'tracked-built-ins';

export default class FeaturesService extends Service {
  _flags = new TrackedMap();

  get flags() {
    return Array.from(this._flags.keys());
  }

  setup(flags) {
    this._resetFlags();
    for (let flag in flags) {
      if (Object.prototype.hasOwnProperty.call(flags, flag)) {
        if (!!flags[flag]) {
          this.enable(flag);
        } else {
          this.disable(flag);
        }
      }
    }
  }

  enable(flag) {
    this._flags.set(flag, true);
  }

  disable(flag) {
    this._flags.set(flag, false);
  }

  isEnabled(feature) {
    let isEnabled = this._featureIsEnabled(feature);
    if (this._logFeatureFlagMissEnabled() && !isEnabled) {
      this._logFeatureFlagMiss(feature);
    }
    return isEnabled;
  }

  _resetFlags() {
    this._flags.clear();
  }

  _featureIsEnabled(flag) {
    return this._flags.get(flag) || false;
  }

  _logFeatureFlagMissEnabled() {
    return !!this.config.LOG_FEATURE_FLAG_MISS;
  }

  _logFeatureFlagMiss(feature) {
    if (console && console.info) {
      console.info('Feature flag off:', feature);
    }
  }
}
