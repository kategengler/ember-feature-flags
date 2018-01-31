export function enableFeature(owner, featureName) {
  let featuresService = owner.lookup('service:features');
  featuresService.enable(featureName);
}
