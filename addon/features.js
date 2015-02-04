import Ember from 'ember';

var camelize = Ember.String.camelize;

export default Ember.Object.create({
  flags: Ember.Object.create(),
  setup: function(flags) {
    var normalizedFlags = {};
    for (var flag in flags) {
      if( flags.hasOwnProperty( flag ) ) {
        normalizedFlags[this.normalizeFlag(flag)] = flags[flag];
      }
    }
    this.flags = Ember.Object.create(normalizedFlags);
  },
  normalizeFlag: function(flag){
    return camelize(flag);
  },
  enable: function(flag) {
    var normalizedFlag = this.normalizeFlag(flag);
    this.flags.set(normalizedFlag, true);
    this.notifyPropertyChange(normalizedFlag);
  },
  disable: function(flag) {
    var normalizedFlag = this.normalizeFlag(flag);
    this.flags.set(normalizedFlag, false);
    this.notifyPropertyChange(normalizedFlag);
  },
  enabled: function( feature ) {
    var isEnabled = this.featureIsEnabled(feature);
    if( this.logFeatureFlagMissEnabled() && !isEnabled ) {
      this.logFeatureFlagMiss(feature);
    }
    return isEnabled;
  },
  featureIsEnabled: function( feature ) {
    var normalizeFeature = this.normalizeFlag(feature);
    return !!this.flags.get(normalizeFeature);
  },
  logFeatureFlagMissEnabled: function() {
    return !!window.ENV && !!window.ENV.LOG_FEATURE_FLAG_MISS;
  },
  logFeatureFlagMiss: function( feature ) {
    console.info('Feature flag off:', feature);
  },
  unknownProperty: function(key) {
    return this.enabled(key);
  },
  setUnknownProperty: function() {
    throw new Error("Please use enable/disable to set feature flags");
  }
});
