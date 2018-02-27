import { getContext } from '@ember/test-helpers';
import { _enableFeature } from './-private/enable-feature';

export function enableFeature(featureName) {
  let { owner } = getContext();
  _enableFeature(owner, featureName);
}
