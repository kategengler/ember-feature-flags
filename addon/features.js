import Ember from 'ember';

var camelize = Ember.String.camelize;

export default Ember.Object.extend({

  init: function(){
    this._super.apply(this, arguments);
    this._flags = Object.create(null);

    this.setUnknownProperty = function(key) {
      throw new Error("Please use enable/disable to set feature flags. You attempted to set "+key);
    };
  },

  setup: function(flags) {
    var normalizedFlags = Object.create(null);
    for (var flag in flags) {
      if( flags.hasOwnProperty( flag ) ) {
        var normalizedFlag = this.normalizeFlag(flag);
        // Use !! to ensure the properties are all booleans.
        normalizedFlags[normalizedFlag] = !!flags[flag];
        this.notifyPropertyChange(normalizedFlag);
      }
    }
    this._flags = normalizedFlags;
  },

  normalizeFlag: function(flag){
    return camelize(flag);
  },

  enable: function(flag) {
    var normalizedFlag = this.normalizeFlag(flag);
    this._flags[normalizedFlag] = true;
    this.notifyPropertyChange(normalizedFlag);
  },

  disable: function(flag) {
    var normalizedFlag = this.normalizeFlag(flag);
    this._flags[normalizedFlag] = false;
    this.notifyPropertyChange(normalizedFlag);
  },

  enabled: function( feature ) {
    Ember.deprecate('[ember-feature-flags] enabled has been deprecated in favor of isEnabled');
    return this.isEnabled(feature);
  },

  isEnabled: function( feature ) {
    var isEnabled = this._featureIsEnabled(feature);
    if( this.logFeatureFlagMissEnabled() && !isEnabled ) {
      this.logFeatureFlagMiss(feature);
    }
    return isEnabled;
  },

  _featureIsEnabled: function( feature ) {
    var normalizeFeature = this.normalizeFlag(feature);
    return this._flags[normalizeFeature] || false;
  },

  logFeatureFlagMissEnabled: function() {
    return !!window.ENV && !!window.ENV.LOG_FEATURE_FLAG_MISS;
  },

  logFeatureFlagMiss: function( feature ) {
    if( console && console.info ) {
      console.info('Feature flag off:', feature);
    }
  },

  unknownProperty: function(key) {
    return this.isEnabled(key);
  }

});
