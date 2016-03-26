import config from '../config/environment';
import IfFeature from 'ember-feature-flags/components/if-feature';

export default IfFeature.extend({
  serviceName: config.featureFlagsService || 'features'
});
