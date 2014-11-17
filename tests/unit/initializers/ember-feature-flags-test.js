import Ember from 'ember';
import init from 'ember-feature-flags/initializers/ember-feature-flags';

var container, application;

module('EmberFeatureFlagsInitializer', {
  setup: function() {
    Ember.run(function() {
      container = new Ember.Container();
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

test('it works', function() {
  init.initialize(container, application);
  // you would normally confirm the results of the initializer here
  ok(true);
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

