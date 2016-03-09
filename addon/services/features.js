import Ember from 'ember';

var camelize = Ember.String.camelize;

export default Ember.Service.extend({

  init() {
    this._super.apply(this, arguments);
    this._flags = Object.create(null);

    this.setUnknownProperty = function(key) {
      throw new Error("Please use enable/disable to set feature flags. You attempted to set "+key);
    };
  },

  setup(flags) {
    var normalizedFlags = Object.create(null);
    for (var flag in flags) {
      if( flags.hasOwnProperty( flag ) ) {
        // Use !! to ensure the properties are all booleans.
        normalizedFlags[this.normalizeFlag(flag)] = !!flags[flag];
      }
    }
    this._flags = normalizedFlags;
  },

  normalizeFlag(flag) {
    return camelize(flag);
  },

  enable(flag) {
    var normalizedFlag = this.normalizeFlag(flag);
    this._flags[normalizedFlag] = true;
    this.notifyPropertyChange(normalizedFlag);
  },

  disable(flag) {
    var normalizedFlag = this.normalizeFlag(flag);
    this._flags[normalizedFlag] = false;
    this.notifyPropertyChange(normalizedFlag);
  },

  enabled(feature) {
    Ember.deprecate('[ember-feature-flags] enabled has been deprecated in favor of isEnabled');
    return this.isEnabled(feature);
  },

  isEnabled(feature) {
    var isEnabled = this._featureIsEnabled(feature);
    if( this.logFeatureFlagMissEnabled() && !isEnabled ) {
      this.logFeatureFlagMiss(feature);
    }
    return isEnabled;
  },

  _featureIsEnabled(feature) {
    var normalizeFeature = this.normalizeFlag(feature);
    return this._flags[normalizeFeature] || false;
  },

  logFeatureFlagMissEnabled() {
    return !!this.get('config.LOG_FEATURE_FLAG_MISS');
  },

  logFeatureFlagMiss(feature) {
    if( console && console.info ) {
      console.info('Feature flag off:', feature);
    }
  },

  unknownProperty(key) {
    return this.isEnabled(key);
  }

});
