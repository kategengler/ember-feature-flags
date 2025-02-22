import Helper from '@ember/component/helper';
import { service } from '@ember/service';

export default class FeatureFlagHelper extends Helper {
  @service features;

  compute([flag]) {
    return this.features.isEnabled(flag);
  }
}
