import { camelize } from '@ember/string';
import { computed, get, set } from '@ember/object';
import { getOwner } from '@ember/application';

const featuresServiceProperty = `_features_${+(new Date())}`

export default function featureFlagMacro(flag) {
  const flagPath = `${featuresServiceProperty}.${camelize(flag)}`;

  return computed(flagPath, function() {
    ensureFeaturesInjection(this);
    return get(this, flagPath);
  });
}

function ensureFeaturesInjection(object) {
  if (!get(object, featuresServiceProperty)) {
    const features = getOwner(object).lookup('service:features')
    set(object, featuresServiceProperty, features)
  }
}
