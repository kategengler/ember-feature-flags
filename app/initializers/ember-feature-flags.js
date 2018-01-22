import Ember from 'ember';
import config from '../config/environment';
import Features from '../services/features';

const INJECTION_FACTORIES_DEPRECATION_MESSAGE = '[ember-feature-flags] Future versions of ember-feature-flags will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';

export function initialize() {
  let application = arguments[1] || arguments[0];
  let serviceName = config.featureFlagsService || 'features';
  let serviceLookupName = `service:${serviceName}`;

  application.register(serviceLookupName, Features);
  application.inject('route', serviceName, serviceLookupName);
  application.inject('controller', serviceName, serviceLookupName);
  application.inject('component', serviceName, serviceLookupName);
  application.inject(serviceLookupName, 'application', 'application:main');

  Ember.deprecate(INJECTION_FACTORIES_DEPRECATION_MESSAGE, false, {
    id: 'ember-feature-flags.deprecate-injection-factories',
    until: '4.0.0'
  });
}

export default {
  name: 'ember-feature-flags',
  initialize
};
