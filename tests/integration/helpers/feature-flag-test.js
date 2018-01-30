import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';

moduleForComponent('feature-flag', 'helper:feature-flag', {
  integration: true,

  beforeEach () {
    this.inject.service('features');
  }
});

test('it renders block invocation with enabled flag', function(assert) {
  this.features.enable('some-feature');

  this.render(hbs`
    {{#if (feature-flag 'someFeature')}}
      Some text
    {{/if}}
  `);

  assert.equal(this.$().text().trim(), 'Some text');
});

test('it renders block invocation with disabled flag', function(assert) {
  this.features.disable('some-feature');

  this.render(hbs`
    {{#if (feature-flag 'someFeature')}}
      Some text
    {{else}}
      Some other text
    {{/if}}
  `);

  assert.equal(this.$().text().trim(), 'Some other text');
});

test('it renders block invocation with unknown flag', function(assert) {
  this.features.setup({
    someFeature: true
  });

  this.render(hbs`
    {{#if (feature-flag 'someOtherFeature')}}
      Some text
    {{else}}
      Some other text
    {{/if}}
  `);

  assert.equal(this.$().text().trim(), 'Some other text');
});

test('it recomputes when flag status changes', function(assert) {
  this.features.setup({
    someFeature: false
  });

  this.render(hbs`
    {{#if (feature-flag 'someFeature')}}
      Some text
    {{else}}
      Some other text
    {{/if}}
  `);

  assert.equal(this.$().text().trim(), 'Some other text');

  run(() => this.features.enable('someFeature'));

  assert.equal(this.$().text().trim(), 'Some text');
});
