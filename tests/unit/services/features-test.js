import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | features', function (hooks) {
  setupTest(hooks);

  this.subject = function () {
    return this.owner.lookup('service:features');
  };

  test('isEnabled', function (assert) {
    let features = this.subject();
    features.setup(undefined);
    assert.equal(
      features.isEnabled('some-feature'),
      false,
      'Feature is false if Features is undefined',
    );

    features.setup({});
    assert.equal(
      features.isEnabled('some-feature'),
      false,
      'Feature is false if Feature on Features is undefined',
    );

    features.setup({ 'some-feature': true });
    assert.equal(
      features.isEnabled('some-feature'),
      true,
      'Feature is true if feature is set to true',
    );

    features.setup({ 'some-feature': false });
    assert.equal(
      features.isEnabled('some-feature'),
      false,
      'Feature is false if feature is set to false',
    );
  });

  test('it exposes list of known flags', function (assert) {
    let features = this.subject();

    features.setup({
      'some-new-feature': true,
      'other-newThing': false,
      'something.other-thing': true,
    });

    assert.deepEqual(features.get('flags'), [
      'some-new-feature',
      'other-newThing',
      'something.other-thing',
    ]);
  });
});
