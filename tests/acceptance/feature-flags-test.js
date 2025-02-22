import { module, test } from 'qunit';
import { visit, click, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import {
  enableFeature,
  disableFeature,
} from 'ember-feature-flags/test-support';
import config from 'dummy/config/environment';

module('Acceptance | feature flags', function (hooks) {
  setupApplicationTest(hooks);

  let oldFeatureFlags;
  hooks.beforeEach(function () {
    oldFeatureFlags = config.featureFlags;
  });
  hooks.afterEach(function () {
    config.featureFlags = oldFeatureFlags;
  });

  test('features are defined in config on featureFlags', async function (assert) {
    config.featureFlags = {
      featureFromConfig: true,
    };

    await visit('/');

    assert
      .dom('.feature-from-config-on')
      .exists('.feature-from-config-on should be in dom');
    assert
      .dom('.feature-from-config-off')
      .doesNotExist('.feature-from-config-off should not be in dom');
  });

  test('visiting / with acceptance-feature on', async function (assert) {
    enableFeature('acceptance-feature');

    await visit('/');

    assert
      .dom('.acceptance-feature-on')
      .exists('Acceptance feature on div should be in dom');
    assert
      .dom('.acceptance-feature-off')
      .doesNotExist('Acceptance feature off div should not be in dom');

    await click('.test-turn-acceptance-off');

    assert
      .dom('.acceptance-feature-on')
      .doesNotExist('Acceptance feature on div should not be in dom');
    assert
      .dom('.acceptance-feature-off')
      .exists('Acceptance feature off div should be in dom');
  });

  test('visiting / and toggling with test helpers', async function (assert) {
    enableFeature('acceptance-feature');

    await visit('/');

    assert
      .dom('.acceptance-feature-on')
      .exists('Acceptance feature on div should be in dom');
    assert
      .dom('.acceptance-feature-off')
      .doesNotExist('Acceptance feature off div should not be in dom');

    disableFeature('acceptance-feature');

    await settled();

    assert
      .dom('.acceptance-feature-on')
      .doesNotExist('Acceptance feature on div should not be in dom');
    assert
      .dom('.acceptance-feature-off')
      .exists('Acceptance feature off div should be in dom');
  });

  test('visiting / with no features set', async function (assert) {
    await visit('/');

    assert
      .dom('.acceptance-feature-on')
      .doesNotExist('Acceptance feature on div should not be in dom');
    assert
      .dom('.acceptance-feature-off')
      .exists('Acceptance feature off div should be in dom');
  });

  test('visiting / with acceptance-feature on and calling setup properly updates flags', async function (assert) {
    enableFeature('acceptance-feature');
    await visit('/');

    assert
      .dom('.acceptance-feature-on')
      .exists('Acceptance feature on div should be in dom');
    assert
      .dom('.acceptance-feature-off')
      .doesNotExist('Acceptance feature off div should not be in dom');

    await click('.test-turn-acceptance-setup-off');

    assert
      .dom('.acceptance-feature-on')
      .doesNotExist('Acceptance feature on div should not be in dom');
    assert
      .dom('.acceptance-feature-off')
      .exists('Acceptance feature off div should be in dom');
  });
});
