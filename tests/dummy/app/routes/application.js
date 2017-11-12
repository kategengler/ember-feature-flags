import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    toggleAcceptanceFeatureOff() {
      this.features.disable('acceptance-feature');
    },
    toggleAcceptanceFeatureSetupOff() {
      this.features.setup({
        'acceptance-feature': false
      });
    }
  }
});
