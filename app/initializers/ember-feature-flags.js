import config from '../config/environment';
import Features from '../features/-main';

export function initialize( container, application ) {
  var serviceName = config.featureFlagsService || 'features';
  application.register('features:-main', Features);
  application.inject('route', serviceName, 'features:-main');
  application.inject('controller', serviceName, 'features:-main');
  application.inject('component', serviceName, 'features:-main');
  application.inject('features:-main', 'application', 'application:main');
}

export default {
  name: 'ember-feature-flags',
  initialize: initialize
};
