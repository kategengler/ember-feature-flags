import Ember from 'ember';
import ff from 'ember-feature-flags/helpers/ff';

export default {
  name: 'ember-feature-flags',
  initialize: function( container, application ) {
    container.optionsForType('features', { instantiate: false, singleton: true });
    application.inject('route', 'features', 'features:main');
    application.inject('controller', 'features', 'features:main');
    application.inject('view', 'features', 'features:main');
    application.inject('component', 'features', 'features:main');
    application.inject('helper', 'features', 'features:main');

    Ember.Handlebars.registerHelper('ff', ff);
  }
};
