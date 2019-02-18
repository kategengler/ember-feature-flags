import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  features: service(),

  actions: {
    toggleAcceptanceFeatureOff() {
      const features = get(this, 'features');

      if (features.get('acceptanceFeature')) {
        features.disable('acceptance-feature');
      } else {
        features.enable('acceptance-feature');
      }
    },
    toggleAcceptanceFeatureSetupOff() {
      const features = get(this, 'features');

      features.setup({
        'acceptance-feature': !features.get('acceptanceFeature')
      });
    }
  }
});
