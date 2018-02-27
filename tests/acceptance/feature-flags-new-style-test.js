import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { enableFeature } from 'ember-feature-flags/test-support';

module('Acceptance | feature flags with new-style acceptance tests', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting / with acceptance-feature on', async function(assert) {
    enableFeature('acceptance-feature');

    await visit('/');

    assert.ok(this.element.querySelector('.acceptance-feature-on'), 'Acceptance feature on div should be in dom');
    assert.notOk(this.element.querySelector('.acceptance-feature-off'), 'Acceptance feature off div should not be in dom');

    await click('.test-turn-acceptance-off');

    assert.notOk(this.element.querySelector('.acceptance-feature-on'), 'Acceptance feature on div should not be in dom');
    assert.ok(this.element.querySelector('.acceptance-feature-off'), 'Acceptance feature off div should be in dom');
  });
});
