import Ember from 'ember';
import init from 'ember-feature-flags/initializers/ember-feature-flags';
import features from 'ember-feature-flags/features';

var container, application;

module('EmberFeatureFlagsInitializer', {
  setup: function() {
    Ember.run(function() {
      container = new Ember.Container();
      application = Ember.Application.create({
        FEATURES: {
          'feature-from-config': true
        }
      });
      application.deferReadiness();
    });
  }
});

test('it works', function() {
  init.initialize(container, application);
  ok(features.enabled('feature-from-config'));
});

test('it injects into all types', function() {
  expect(5);
  var types = ['route', 'controller', 'view', 'component', 'helper'];
  var fakeApp = {};
  fakeApp.inject = function( type ) {
    ok(types.indexOf(type) !== -1, type + ' should be in list');
  };
  init.initialize(container, fakeApp);
});

