import { getContext } from '@ember/test-helpers';

export function _disableFeature(featureName) {
  let { owner } = getContext();
  owner.lookup('service:features').disable(featureName);
}
