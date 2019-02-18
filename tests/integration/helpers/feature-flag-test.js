import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';

module('helper:feature-flag', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.features = this.owner.lookup('service:features');
  });

  test('it renders block invocation with enabled flag', async function(assert) {
    this.features.enable('some-feature');

    await render(hbs`
      <span>{{if (feature-flag 'someFeature') "Some text"}}</span>
    `);

    assert.dom('span').hasText('Some text');
  });

  test('it renders block invocation with disabled flag', async function(assert) {
    this.features.disable('some-feature');

    await render(hbs`
      <span>{{if (feature-flag 'someFeature') "Some text" "Some other text"}}</span>
    `);

    assert.dom('span').hasText('Some other text');
  });

  test('it renders block invocation with unknown flag', async function(assert) {
    this.features.setup({
      someFeature: true
    });

    await render(hbs`
      <span>{{if (feature-flag 'someOtherFeature') "Some text" "Some other text"}}</span>
    `);

    assert.dom('span').hasText('Some other text');
  });

  test('it recomputes when flag status changes', async function(assert) {
    this.features.setup({
      someFeature: false
    });

    await render(hbs`
      <span>{{if (feature-flag 'someFeature') "Some text" "Some other text"}}</span>
    `);

    assert.dom('span').hasText('Some other text');

    run(() => this.features.enable('someFeature'));

    assert.dom('span').hasText('Some text');
  });
});
