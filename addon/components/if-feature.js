import Ember from 'ember';
import layout from '../templates/components/if-feature';

let IfFeatureComponent = Ember.Component.extend({
  layout,
  tagName: '',
  init() {
    this._super(...arguments);
    let applicationInstance = Ember.getOwner(this);
    let featuresService = applicationInstance.lookup(`service:${this.serviceName}`);
    this.set('featureService', featuresService);
  },
  normalizedFlag: Ember.computed('flag', function() {
    return Ember.String.camelize(this.get('flag'));
  })
});

IfFeatureComponent.reopenClass({
  positionalParams: ['flag']
});

export default IfFeatureComponent;
