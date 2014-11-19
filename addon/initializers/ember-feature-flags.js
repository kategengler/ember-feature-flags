import Ember from 'ember';
import ifFeature from 'ember-feature-flags/helpers/if-feature';

export default {
  name: 'ember-feature-flags',
  initialize: function( container, application ) {
    container.optionsForType('features', { instantiate: false, singleton: true });
    application.inject('route', 'features', 'features:main');
    application.inject('controller', 'features', 'features:main');
    application.inject('view', 'features', 'features:main');
    application.inject('component', 'features', 'features:main');
    application.inject('helper', 'features', 'features:main');

    Ember.Handlebars.registerHelper('if-feature', ifFeature);
  }
};
