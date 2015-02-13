import Ember from 'ember';

export default Ember.Object.create({
  flags: Ember.Object.create(),
  setup: function(flags) {
    this.flags = Ember.Object.create(flags);
  },
  enable: function(flag) {
    this.flags.set(flag, true);
  },
  disable: function(flag) {
    this.flags.set(flag, false);
  },
  assign: function(flags) {
    Object.keys(flags).map(function(flag) {
      flags[flag] ? this.enable(flag) : this.disable(flag);
    }.bind(this));
  },
  enabled: function( feature ) {
    var isEnabled = this.featureIsEnabled(feature);
    if( this.logFeatureFlagMissEnabled && !isEnabled ) {
      this.logFeatureFlagMiss(feature);
    }
    return isEnabled;
  },
  featureIsEnabled: function( feature ) {
    return !!this.flags.get(feature);
  },
  logFeatureFlagMissEnabled: function() {
    return !!window.ENV && !!window.ENV.LOG_FEATURE_FLAG_MISS;
  },
  logFeatureFlagMiss: function( feature ) {
    console.info('Feature flag off:', feature);
  }
});
