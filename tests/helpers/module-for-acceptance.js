import { module } from 'qunit';
import destroyApp from '../helpers/destroy-app';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      if (options.beforeEach) {
        options.beforeEach(...arguments);
      }
    },

    afterEach() {
      if (options.afterEach) {
        options.afterEach(...arguments);
      }

      destroyApp(this.application);
    }
  });
}
