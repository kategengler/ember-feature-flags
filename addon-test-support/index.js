import { getContext } from '@ember/test-helpers';
import { _enableFeature } from './-private/enable-feature';

export function enableFeature(featureName) {
  let { owner } = getContext();
  _enableFeature(owner, featureName);
}

export { _disableFeature as disableFeature } from './-private/disable-feature';
