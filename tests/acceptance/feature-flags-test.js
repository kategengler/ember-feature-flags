import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { enableFeature } from 'ember-feature-flags/test-support';
import config from "../../config/environment";

module('Acceptance | feature flags', function(hooks) {
  setupApplicationTest(hooks);

  test('features are defined in config on featureFlags', async function(assert) {
    assert.expect(2);
    config.featureFlags = {
      'feature-from-config': true
    };

    await visit('/');

    assert.dom('.feature-from-config-on').exists();
    assert.dom('.feature-from-config-off').doesNotExist();
  });

  test('visiting / with acceptance-feature on', async function(assert) {
    enableFeature('acceptance-feature');

    await visit('/');

    assert.dom('.acceptance-feature-on').exists();
    assert.dom('.acceptance-feature-off').doesNotExist();

    await click('.test-turn-acceptance-off');

    assert.dom('.acceptance-feature-on').doesNotExist();
    assert.dom('.acceptance-feature-off').exists();
  });
});
