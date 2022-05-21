import { moduleFor, test } from 'ember-qunit';
import EmberObject from '@ember/object';
import { macro as featureFlag } from 'ember-feature-flags';
import { run } from '@ember/runloop';

const Thing = EmberObject.extend({
  someFeatureIsEnabled: featureFlag('some-feature')
});

moduleFor('model:thing', 'computed-property-macro:feature-flag', {
  integration: true,

  beforeEach () {
    this.register('model:thing', Thing);
    this.inject.service('features');
  }
});

test('it returns true when the feature flag is enabled', function(assert) {
  const thing = this.subject();
  assert.equal(thing.get('someFeatureIsEnabled'), false, 'initial');
  run(this.features, 'enable', 'some-feature');
  assert.equal(thing.get('someFeatureIsEnabled'), true, 'recompute');
});

test('it observes changes to alternate spellings', function(assert) {
  const thing = this.subject();
  assert.equal(thing.get('someFeatureIsEnabled'), false, 'initial');
  run(this.features, 'enable', 'someFeature');
  assert.equal(thing.get('someFeatureIsEnabled'), true, 'recompute');
});
