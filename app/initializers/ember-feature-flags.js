import config from '../config/environment';
import Features from '../services/features';

export function initialize() {
  let application = arguments[1] || arguments[0];
  let serviceName = config.featureFlagsService || 'features';
  let serviceLookupName = `service:${serviceName}`;

  application.register(serviceLookupName, Features);
  application.inject('route', serviceName, serviceLookupName);
  application.inject('controller', serviceName, serviceLookupName);
  application.inject('component', serviceName, serviceLookupName);
  application.inject(serviceLookupName, 'application', 'application:main');
}

export default {
  name: 'ember-feature-flags',
  initialize
};
