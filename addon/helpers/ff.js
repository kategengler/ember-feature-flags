import Ember from 'ember';
import features from '../features';

var helpers = Ember.Handlebars.helpers;

export function ff(featureKey, options) {
  var fnTrue = options.fn;
  var fnFalse = options.inverse;
  var originalContext = this;

  if (options.contexts && options.contexts.length) {
    originalContext = options.contexts[0];
  }

  delete options.contexts;

  options.fn = function (context, options) {
    return fnTrue.call(originalContext, originalContext, options);
  };

  options.inverse = function (context, options) {
    if (features.logFeatureFlagMissEnabled) {
      features.logFeatureFlagMiss(featureKey);
    }

    return fnFalse.call(originalContext, originalContext, options);
  };
 
  return helpers.boundIf.call(window.Features, featureKey, options);
}

export default ff;
