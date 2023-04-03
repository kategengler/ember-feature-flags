import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | features', function (hooks) {
  setupTest(hooks);

  this.subject = function () {
    return this.owner.lookup('service:features');
  };

  test('isEnabled', function (assert) {
    const features = this.subject();
    features.setup(undefined);
    assert.false(
      features.isEnabled('some-feature'),
      'Feature is false if Features is undefined'
    );

    features.setup({});
    assert.false(
      features.isEnabled('some-feature'),
      'Feature is false if Feature on Features is undefined'
    );

    features.setup({ 'some-feature': true });
    assert.true(
      features.isEnabled('some-feature'),
      'Feature is true if feature is set to true'
    );

    features.setup({ 'some-feature': false });
    assert.false(
      features.isEnabled('some-feature'),
      'Feature is false if feature is set to false'
    );
  });

  test('it exposes list of known flags', function (assert) {
    const features = this.subject();

    features.setup({
      'some-new-feature': true,
      'other-newThing': false,
      'something.other-thing': true,
    });

    assert.deepEqual(features.flags, [
      'someNewFeature',
      'otherNewThing',
      'somethingOtherThing',
    ]);
  });
});
