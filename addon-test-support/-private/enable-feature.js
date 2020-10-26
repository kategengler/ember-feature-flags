export function _enableFeature(owner, featureName) {
  const featuresService = owner.lookup('service:features');
  featuresService.enable(featureName);
}
