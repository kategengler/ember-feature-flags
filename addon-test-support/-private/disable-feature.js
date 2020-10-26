import { getContext } from '@ember/test-helpers';

export function _disableFeature(featureName) {
  let { owner } = getContext();
  const featuresService = owner.lookup('service:features');
  featuresService.disable(featureName);
}
