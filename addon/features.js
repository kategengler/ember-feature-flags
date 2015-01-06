export default {
  flags: {},
  setup: function(flags) {
    this.flags = flags;
  },
  set: function(flag, enabled) {
    this.flags[flag] = enabled;
  },
  enabled: function( feature ) {
    var isEnabled = this.featureIsEnabled(feature);
    if( this.logFeatureFlagMissEnabled && !isEnabled ) {
      this.logFeatureFlagMiss(feature);
    }
    return isEnabled;
  },
  featureIsEnabled: function( feature ) {
    return !!(this.flags && this.flags[feature]);
  },
  logFeatureFlagMissEnabled: function() {
    return !!window.ENV && !!window.ENV.LOG_FEATURE_FLAG_MISS;
  },
  logFeatureFlagMiss: function( feature ) {
    console.info('Feature flag off:', feature);
  }
};
