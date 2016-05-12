
# ember-feature-flags [![Build Status](https://travis-ci.org/kategengler/ember-feature-flags.svg?branch=master)](https://travis-ci.org/kategengler/ember-feature-flags) [![Ember Observer Score](http://emberobserver.com/badges/ember-feature-flags.svg)](http://emberobserver.com/addons/ember-feature-flags)

An ember-cli addon to provide feature flags. 

### Installation

```
ember install ember-feature-flags
```

### Usage

This addon injects a property `features` (configurablee) into your routes, controllers and components.

For example you may check if a feature is enabled:

```js
export default Ember.Controller.extend({
  plans: function(){
    if (this.features.isEnabled('new-billing-plans')){
      // Return new plans
    } else {
      // Return old plans
    }
  }.property()
});
```

Features are also available as properties of `features`. They are camelized.

```js
export default Ember.Controller.extend({
  plans: function(){
    if (this.features.get('newBillingPlans')){
      // Return new plans
    } else {
      // Return old plans
    }
  }.property('features.newBillingPlans')
});
```

Check whether a feature is enabled in a template:

```hbs
{{#if features.newHomepage}}
  {{link-to "new.homepage"}}
{{else}}
  {{link-to "old.homepage"}}
{{/if}}
```

Features can be toggled at runtime, and are bound:

```js
features.enable('newHomepage');
features.disable('newHomepage');
```

Features can be set in bulk:

```js
features.setup({
  "new-billing-plans": true,
  "new-homepage": false
});
```

### Configuration

#### `config.featureFlags`

You can configure a set of initial feature flags in your app's `config/environment.js` file. This
is an easy way to change settings for a given environment. For example:

```javascript
// config/environment.js
module.exports = function(environment) {
  var ENV = {
    featureFlags: {
      'show-spinners': true,
      'download-cats': false
    }
  };

  if (environment === 'production') {
    ENV.featureFlags['download-cats'] = true;
  }

  return ENV;
};
```

#### `config.featureFlagsService`

The name of the `features` injection can be customized with the `featureFlagsService` config
option. For example:

```javascript
// config/environment.js
module.exports = function(environment) {
  var ENV = {
    featureFlagsService: 'featuresService'
  };
  return ENV;
};
```

#### `ENV.LOG_FEATURE_FLAG_MISS`

Will log when a feature flag is queried and found to be off, useful to prevent cursing at the app,
wondering why your feature is not working.

### Test Helpers

#### `withFeature`

Turns on a feature for the test in which it is called.
To use, import into your test-helper.js: `import 'ember-feature-flags/tests/helpers/with-feature'` and add to your 
test `.jshintrc`, it will now be available in all of your tests.

Example:

```js
import 'ember-feature-flags/tests/helpers/with-feature';

test( "links go to the new homepage", function () {
  withFeature( 'new-homepage' );

  visit('/');
  click('a.home');
  andThen(function(){
    equal(currentRoute(), 'new.homepage', 'Should be on the new homepage');
  });
});
```

### Integration Tests

If you use `this.features.isEnabled()` in components under integration test, you will need to inject a stub service in your tests. Using ember-qunit 0.4.16 or later, here's how to do this:

```js
const { getOwner } = Ember;

let featuresService = Ember.Service.extend({
  isEnabled() {
    return false;
  }
});

moduleForComponent('my-component', 'Integration | Component | my component', {
  integration: true,
  beforeEach() {
    this.register('service:features', featuresService);
    getOwner(this).inject('component', 'features', 'service:features');
  }
});
```

Note: for Ember before 2.3.0, you'll need to use [ember-getowner-polyfill](https://github.com/rwjblue/ember-getowner-polyfill).

### Development

#### Installation

* `git clone` this repository
* `npm install`
* `bower install`

#### Running

* `ember server`
* Visit your app at http://localhost:4200.

#### Running Tests

* `ember test`
* `ember test --server`

#### Building

* `ember build`
