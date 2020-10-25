export function _enableFeature(owner, featureName) {
  const featuresService = owner.lookup('service:features');
  featuresService.enable(featureName);
}

export function _disableFeature(owner, featureName) {
  const featuresService = owner.lookup('service:features');
  featuresService.disable(featureName);
}
