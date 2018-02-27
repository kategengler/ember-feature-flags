export function _enableFeature(owner, featureName) {
  let featuresService = owner.lookup('service:features');
  featuresService.enable(featureName);
}
