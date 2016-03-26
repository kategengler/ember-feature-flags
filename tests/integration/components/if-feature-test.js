import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let featuresStub = Ember.Service.extend({});

moduleForComponent('if-feature', 'Integration | Component | with feature', {
  integration: true,
  beforeEach() {
    this.register('service:features', featuresStub);
    this.inject.service('features', { as: 'features' });
  }
});

test('it renders blocks passed if feature is on', function(assert) {
  this.set('features.featureA', true);
  this.render(hbs`
    {{#if-feature 'featureA'}}
      Feature is ON!
    {{/if-feature}}
  `);

  assert.equal(this.$().text().trim(), 'Feature is ON!');
});

test('it renders blocks passed if feature is on or off', function(assert) {
  this.set('features.featureA', true);
  this.render(hbs`
    {{#if-feature 'featureA'}}
      Feature is ON!
    {{else}}
      Feature is OFF!
    {{/if-feature}}
  `);

  assert.equal(this.$().text().trim(), 'Feature is ON!');
  this.set('features.featureA', false);
  assert.equal(this.$().text().trim(), 'Feature is OFF!');
});

test('it normalizes the feature name', function(assert) {
  this.set('features.featureBlah', true);
  this.render(hbs`
    {{#if-feature 'feature-blah'}}
      Feature blah is ON!
    {{/if-feature}}
  `);

  assert.equal(this.$().text().trim(), 'Feature blah is ON!');
});
