import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service features;

  toggleAcceptanceFeatureOff() {
    this.features.disable('acceptance-feature');
  }

  toggleAcceptanceFeatureSetupOff() {
    this.features.setup({
      'acceptance-feature': false,
    });
  }
}
