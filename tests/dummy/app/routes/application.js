import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  features: service(),

  actions: {
    toggleAcceptanceFeatureOff() {
      this.get('features').disable('acceptance-feature');
    },
    toggleAcceptanceFeatureSetupOff() {
      this.get('features').setup({
        'acceptance-feature': false
      });
    }
  }
});
