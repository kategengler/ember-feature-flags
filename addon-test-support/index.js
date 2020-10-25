import { getContext } from '@ember/test-helpers';
import { _enableFeature, _disableFeature } from './-private/toggle-feature';

export function enableFeature(featureName) {
  let { owner } = getContext();
  _enableFeature(owner, featureName);
}

export function disableFeature(featureName) {
  let { owner } = getContext();
  _disableFeature(owner, featureName);
}
