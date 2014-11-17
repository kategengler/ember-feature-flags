export default {
  enabled: function( feature ) {
    var isEnabled = this.featureIsEnabled(feature);
    if( this.logFeatureFlagMissEnabled && !isEnabled ) {
      this.logFeatureFlagMiss(feature);
    }
    return isEnabled;
  },
  featureIsEnabled: function( feature ) {
    if( window.Features === undefined ) {
      return false;
    }
    if( window.Features[ feature ] === undefined ) {
      return false;
    }
    return window.Features[feature ];
  },
  logFeatureFlagMissEnabled: function() {
    return !!window.ENV && !!window.ENV.LOG_FEATURE_FLAG_MISS;
  },
  logFeatureFlagMiss: function( feature ) {
    console.info('Feature flag off:', feature);
  }
};
