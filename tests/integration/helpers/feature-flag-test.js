import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';

module('Integration | Helper | feature-flag', function (hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    this.features = this.owner.lookup('service:features');
  });

  test('it renders block invocation with enabled flag', async function (assert) {
    this.features.enable('some-feature');

    await render(hbs`
      {{#if (feature-flag 'someFeature')}}
        Some text
      {{/if}}
    `);

    assert.equal(this.element.textContent.trim(), 'Some text');
  });

  test('it renders block invocation with disabled flag', async function (assert) {
    this.features.disable('some-feature');

    await render(hbs`
      {{#if (feature-flag 'someFeature')}}
        Some text
      {{else}}
        Some other text
      {{/if}}
    `);

    assert.equal(this.element.textContent.trim(), 'Some other text');
  });

  test('it renders block invocation with unknown flag', async function (assert) {
    this.features.setup({
      someFeature: true,
    });

    await render(hbs`
      {{#if (feature-flag 'someOtherFeature')}}
        Some text
      {{else}}
        Some other text
      {{/if}}
    `);

    assert.equal(this.element.textContent.trim(), 'Some other text');
  });

  test('it recomputes when flag status changes', async function (assert) {
    this.features.setup({
      someFeature: false,
    });

    await render(hbs`
      {{#if (feature-flag 'someFeature')}}
        Some text
      {{else}}
        Some other text
      {{/if}}
    `);

    assert.equal(this.element.textContent.trim(), 'Some other text');

    run(() => this.features.enable('someFeature'));

    assert.equal(this.element.textContent.trim(), 'Some text');
  });
});
