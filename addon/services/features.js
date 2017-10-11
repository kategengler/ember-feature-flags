import Ember from 'ember';

let { camelize } = Ember.String;

export default Ember.Service.extend({

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
    this.notifyPropertyChange('_flags');
  },

  disable(flag) {
    let normalizedFlag = this._normalizeFlag(flag);
    this._flags[normalizedFlag] = false;
    this.notifyPropertyChange(normalizedFlag);
    this.notifyPropertyChange('_flags');    
  },

  isEnabled(feature) {
    let isEnabled = this._featureIsEnabled(feature);
    if (this._logFeatureFlagMissEnabled() && !isEnabled) {
      this._logFeatureFlagMiss(feature);
    }
    return isEnabled;
  },

  /**
   * @public
   * Return list of all flags
   */
  flags: Ember.computed('_flags', function() {
    return this.get('_flags');
  }),
  
  /**
   * @private
   */
  _resetFlags() {
    this._flags = Object.create(null);
  },

  /**
   * @private
   * @param {*} feature 
   */
  _featureIsEnabled(feature) {
    let normalizeFeature = this._normalizeFlag(feature);
    return this._flags[normalizeFeature] || false;
  },

  /**
   * @private
   */
  _logFeatureFlagMissEnabled() {
    return !!this.get('config.LOG_FEATURE_FLAG_MISS');
  },

  /**
   * @private
   * @param {*} feature 
   */
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
