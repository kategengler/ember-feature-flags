import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  features: service(),

  compute([flag]) {
    return this.get('features').get(flag)
  },
});
