import { moduleFor, test } from 'ember-qunit';

moduleFor('service:features', 'Unit | Service | features', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('isEnabled', function(assert) {
  assert.expect(20);

  let features = this.subject();

  // True values

  features.setup({ 'some-feature': true });
  assert.equal(features.isEnabled('some-feature'), true, 'Feature is true if feature is set to true');

  features.setup({ 'some-feature': 'true' });
  assert.equal(features.isEnabled('some-feature'), true, 'Feature is true if feature is set to true');

  features.setup({ 'some-feature': 'TRUE' });
  assert.equal(features.isEnabled('some-feature'), true, 'Feature is true if feature is set to true');

  features.setup({ 'some-feature': 1 });
  assert.equal(features.isEnabled('some-feature'), true, 'Feature is true if feature is set to true');

  features.setup({ 'some-feature': '1' });
  assert.equal(features.isEnabled('some-feature'), true, 'Feature is true if feature is set to true');

  features.setup({ 'some-feature': 't' });
  assert.equal(features.isEnabled('some-feature'), true, 'Feature is true if feature is set to true');

  features.setup({ 'some-feature': 'T' });
  assert.equal(features.isEnabled('some-feature'), true, 'Feature is true if feature is set to true');

  features.setup({ 'some-feature': 'on' });
  assert.equal(features.isEnabled('some-feature'), true, 'Feature is true if feature is set to true');

  features.setup({ 'some-feature': 'ON' });
  assert.equal(features.isEnabled('some-feature'), true, 'Feature is true if feature is set to true');

  // False values

  features.setup(undefined);
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if Features is undefined');

  features.setup({});
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if Feature on Features is undefined');

  features.setup({ 'some-feature': false });
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if feature is set to false');

  features.setup({ 'some-feature': 'false' });
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if feature is set to false');

  features.setup({ 'some-feature': "FALSE" });
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if feature is set to false');

  features.setup({ 'some-feature': 0 });
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if feature is set to false');

  features.setup({ 'some-feature': '0' });
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if feature is set to false');

  features.setup({ 'some-feature': 'f' });
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if feature is set to false');

  features.setup({ 'some-feature': 'F' });
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if feature is set to false');

  features.setup({ 'some-feature': "off" });
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if feature is set to false');

  features.setup({ 'some-feature': "OFF" });
  assert.equal(features.isEnabled('some-feature'), false, 'Feature is false if feature is set to false');
});

test('unknownProperties', function(assert) {
  let features = this.subject();

  features.setup({
    'some-new-feature': true,
    'other-newThing': false,
    'something.other-thing': true
  });

  assert.equal(true, features.get('someNewFeature'), 'Should be available on features');
  assert.equal(false, features.get('otherNewThing'), 'Should be available on features');
  assert.equal(true, features.get('somethingOtherThing'), 'Should be available on features');

  assert.throws(function() {
    features.set('someNewFeature');
  }, /use enable/, 'Throws an error when setting an unknownProperty');
});

test('it exposes list of known flags', function(assert) {
  let features = this.subject();

  features.setup({
    'some-new-feature': true,
    'other-newThing': false,
    'something.other-thing': true
  });

  assert.deepEqual(features.get('flags'), ['someNewFeature', 'otherNewThing', 'somethingOtherThing']);
});
