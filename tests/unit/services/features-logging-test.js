import { moduleFor, test } from 'ember-qunit';

var origEnv;

moduleFor('service:features', 'Unit | Service | features - logging', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  beforeEach() {
    origEnv = window.ENV;
  },
  afterEach() {
    window.ENV = origEnv;
  }
});

test('logFeatureFlagMissEnabled is false by default', function(assert) {
  let features = this.subject();
  assert.equal(features.logFeatureFlagMissEnabled(), false,
    'Logging should be disabled without LOG_FEATURE_FLAG_MISS flag set');
});

test('logFeatureFlagMissEnabled is true when LOG_FEATURE_FLAG_MISS true', function(assert) {
  let features = this.subject();
  window.ENV = {LOG_FEATURE_FLAG_MISS: true};
  assert.equal(features.logFeatureFlagMissEnabled(), true,
    'Logging should be enabled with LOG_FEATURE_FLAG_MISS set to true');
});

test('logFeatureFlagMissEnabled is false when LOG_FEATURE_FLAG_MISS false', function(assert) {
  let features = this.subject();
  window.ENV = {LOG_FEATURE_FLAG_MISS: false};
  assert.equal(features.logFeatureFlagMissEnabled(), false,
    'Logging should be disabled with LOG_FEATURE_FLAG_MISS set to false');
});
