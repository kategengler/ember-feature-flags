/* eslint-disable no-console */
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { camelize } from '@ember/string';

export default class FeaturesService extends Service {
  @tracked _flags = {};
  config = {};

  constructor() {
    super(...arguments);
  }

  get flags() {
    return Object.keys(this._flags);
  }

  setup(flags) {
    flags = flags ?? {};
    this._resetFlags();
    Object.keys(flags).forEach((flag) =>
      flags[flag] ? this.enable(flag) : this.disable(flag)
    );
  }

  enable(flag) {
    const normalizedFlag = this._normalizeFlag(flag);
    this._flags = Object.assign(this._flags, { [normalizedFlag]: true });
  }

  disable(flag) {
    const normalizedFlag = this._normalizeFlag(flag);
    this._flags = Object.assign(this._flags, { [normalizedFlag]: false });
  }

  isEnabled(feature) {
    const isEnabled = this._featureIsEnabled(feature);
    if (this._logFeatureFlagMissEnabled() && !isEnabled) {
      this._logFeatureFlagMiss(feature);
    }
    return isEnabled;
  }

  _resetFlags() {
    this._flags = {};
  }

  _featureIsEnabled(feature) {
    const normalizeFeature = this._normalizeFlag(feature);
    return this._flags[normalizeFeature] || false;
  }

  _logFeatureFlagMissEnabled() {
    return !!this.config.LOG_FEATURE_FLAG_MISS;
  }

  _logFeatureFlagMiss(feature) {
    if (console && console.info) {
      console.info('Feature flag off:', feature);
    }
  }

  _normalizeFlag(flag) {
    return camelize(flag);
  }
}
