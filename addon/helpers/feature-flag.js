import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class FeatureFlag extends Helper {
  @service features;

  compute([flag]) {
    return this.features.isEnabled(flag);
  }
}
