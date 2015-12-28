import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    toggleAcceptanceFeatureOff() {
      this.features.disable('acceptance-feature');
    },
    toggleAcceptanceFeatureSetupOff: function(){
      this.features.setup({
		 "acceptance-feature": false
	  });
    }
  }
});
