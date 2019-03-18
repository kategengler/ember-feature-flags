/*eslint-disable no-extra-boolean-cast, no-console */
import { computed } from '@ember/object';
import Service from '@ember/service';
import { camelize } from '@ember/string';

const TRUE_VALUES = [true, 1, "1", "t", "T", "true", "TRUE", "on", "ON"];

export default Service.extend({
  init() {
    this._super(...arguments);
    this._flags = Object.create(null);

    this.setUnknownProperty = function(key) {
      throw new Error(`Please use enable/disable to set feature flags. You attempted to set ${key}`);
    };
  },

  setup(flags) {
    this._resetFlags();
    for (let flag in flags) {
      if (flags.hasOwnProperty(flag)) {
        if (!!flags[flag]) {
          this.enable(flag);
        } else {
          this.disable(flag);
        }
      }
    }
  },

  enable(flag) {
    let normalizedFlag = this._normalizeFlag(flag);
    this._flags[normalizedFlag] = true;
    this.notifyPropertyChange(normalizedFlag);
  },

  disable(flag) {
    let normalizedFlag = this._normalizeFlag(flag);
    this._flags[normalizedFlag] = false;
    this.notifyPropertyChange(normalizedFlag);
  },

  isEnabled(feature) {
    let isEnabled = this._featureIsEnabled(feature);
    if (this._logFeatureFlagMissEnabled() && !isEnabled) {
      this._logFeatureFlagMiss(feature);
    }
    return isEnabled;
  },

  flags: computed(function () {
    return Object.keys(this._flags);
  }).volatile(),

  _resetFlags() {
    this._flags = Object.create(null);
  },

  _featureIsEnabled(feature) {
    let normalizeFeature = this._normalizeFlag(feature);
    return TRUE_VALUES.includes(this._flags[normalizeFeature]);
  },

  _logFeatureFlagMissEnabled() {
    return !!this.get('config.LOG_FEATURE_FLAG_MISS');
  },

  _logFeatureFlagMiss(feature) {
    if (console && console.info) {
      console.info('Feature flag off:', feature);
    }
  },

  _normalizeFlag(flag) {
    return camelize(flag);
  },

  unknownProperty(key) {
    return this.isEnabled(key);
  }

});
