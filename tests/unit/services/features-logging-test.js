import { moduleFor, test } from 'ember-qunit';
import config from 'dummy/config/environment';

let origConfig;

moduleFor('service:features', 'Unit | Service | features - logging', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  beforeEach() {
    origConfig = config.LOG_FEATURE_FLAG_MISS;
  },
  afterEach() {
    config.LOG_FEATURE_FLAG_MISS = origConfig;
  }
});

test('_logFeatureFlagMissEnabled is false by default', function(assert) {
  let features = this.subject();
  assert.equal(features._logFeatureFlagMissEnabled(), false,
    'Logging should be disabled without LOG_FEATURE_FLAG_MISS flag set');
});

test('_logFeatureFlagMissEnabled is true when LOG_FEATURE_FLAG_MISS true', function(assert) {
  config.LOG_FEATURE_FLAG_MISS = true;
  let features = this.subject();
  assert.equal(features._logFeatureFlagMissEnabled(), true,
    'Logging should be enabled with LOG_FEATURE_FLAG_MISS set to true');
});

test('_logFeatureFlagMissEnabled is false when LOG_FEATURE_FLAG_MISS false', function(assert) {
  config.LOG_FEATURE_FLAG_MISS = false;
  let features = this.subject();
  assert.equal(features._logFeatureFlagMissEnabled(), false,
    'Logging should be disabled with LOG_FEATURE_FLAG_MISS set to false');
});
