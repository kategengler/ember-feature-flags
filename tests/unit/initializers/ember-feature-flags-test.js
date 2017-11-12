import { run } from '@ember/runloop';
import Application from '@ember/application';
import EmberObject from '@ember/object';
import { initialize } from '../../../initializers/ember-feature-flags';
import { module, test } from 'qunit';
import config from 'dummy/config/environment';

let registry, container, application, oldFeatureFlagsService;

module('EmberFeatureFlagsInitializer', {
  beforeEach() {
    oldFeatureFlagsService = config.featureFlagsService;
    run(function() {
      application = Application.create();
      container = application.__container__;
      registry = null;
      application.deferReadiness();
    });
  },
  afterEach() {
    config.featureFlagsService = oldFeatureFlagsService;
  }
});

test('service is registered', function(assert) {
  initialize(registry, application);
  let service = container.lookup('service:features');
  assert.ok(service, 'service is registered');
});

test('service has application injected', function(assert) {
  initialize(registry, application);
  let service = container.lookup('service:features');
  assert.ok(service.application, 'service has application');
});

['controller', 'component'].forEach(function(type) {
  test(`${type} has service injected`, function(assert) {
    initialize(registry, application);
    application.register(`${type}:main`, EmberObject.extend());
    let instance = container.lookup(`${type}:main`);
    assert.ok(instance.features, 'service is injected');
  });
});

['controller', 'component'].forEach(function(type) {
  test(`${type} has service injected with custom name`, function(assert) {
    config.featureFlagsService = 'wackyWhoop';
    initialize(registry, application);
    application.register(`${type}:main`, EmberObject.extend());
    let instance = container.lookup(`${type}:main`);
    assert.ok(instance.wackyWhoop, 'service is injected');
  });
});
