export function _enableFeature(owner, featureName) {
  owner.lookup('service:features').enable(featureName);
}
