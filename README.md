
# ember-feature-flags [![Build Status](https://travis-ci.org/kategengler/ember-feature-flags.svg?branch=master)](https://travis-ci.org/kategengler/ember-feature-flags) [![Ember Observer Score](http://emberobserver.com/badges/ember-feature-flags.svg)](http://emberobserver.com/addons/ember-feature-flags)

An ember-cli addon to provide feature flags. 

### Installation

```
ember install ember-feature-flags
```

### Usage

This addon provides a service named `features` available for injection into your routes, controllers, components, etc.

For example you may check if a feature is enabled:

```js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
  features: service(), 
  plans() {
    if (this.get('features').isEnabled('new-billing-plans')) {
      // Return new plans
    } else {
      // Return old plans
    }
  }
});
```

Features are also available as properties of `features`. They are camelized.

```js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
export default Controller.extend({
  features: service(), 
  plans: computed('features.newBillingPlans', function(){
    if (this.get('features.newBillingPlans')) {
      // Return new plans
    } else {
      // Return old plans
    }
  })
});
```

Check whether a feature is enabled in a template (be sure to inject the features service into the template's backing JavaScript):

```hbs
// templates/components/homepage-link.hbs
{{#if features.newHomepage}}
  {{link-to "new.homepage"}}
{{else}}
  {{link-to "old.homepage"}}
{{/if}}
```

*NOTE:* `features` service must be injected into the respective component:

```js
// components/homepage-link.js
export default Component.extend({
  features: service()
});
```

Alternatively you can use a template helper named `feature-flag`:

```hbs
// templates/components/homepage-link.hbs
{{#if (feature-flag 'newHomepage')}}
  {{link-to "new.homepage"}}
{{else}}
  {{link-to "old.homepage"}}
{{/if}}
``` 

Features can be toggled at runtime, and are bound:

```js
this.get('features').enable('newHomepage');
this.get('features').disable('newHomepage');
```

Features can be set in bulk:

```js
this.get('features').setup({
  "new-billing-plans": true,
  "new-homepage": false
});
```
*NOTE:* `setup` methods reset previously setup flags and their state.

You can get list of known feature flags via `flags` computed property:
```js
this.get('features').setup({
  "new-billing-plans": true,
  "new-homepage": false
});

this.get('features.flags') // ['newBillingPlans', 'newHomepage']
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

#### `ENV.LOG_FEATURE_FLAG_MISS`

Will log when a feature flag is queried and found to be off, useful to prevent cursing at the app,
wondering why your feature is not working.

### Test Helpers

#### `enableFeature`

Turns on a feature for the test in which it is called.
Requires ember-cli-qunit >= 4.1.0. 

Example:
```js
import { enableFeature } from 'ember-feature-flags/test-support';

module('Acceptance | Awesome page', function(hooks) {
  setupApplicationTest(hooks);

  test('links go to the new homepage', async function (assert) {
    enableFeature('new-homepage');
  
    await visit('/');
    await click('a.home');

    assert.equal(currentRoute(), 'new.homepage', 'Should be on the new homepage');
  });
});
```

#### `withFeature`

"Old"-style acceptance tests can utilize `withFeature` test helper to turn on a feature for the test.
To use, import into your test-helper.js: `import 'ember-feature-flags/test-support/helpers/with-feature'` and add to your 
test `.jshintrc`, it will now be available in all of your tests.

Example:

```js
import 'ember-feature-flags/test-support/helpers/with-feature';

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
let featuresService = Service.extend({
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
* cd ember-feature-flags`
* `yarn install`

#### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

#### Running Tests

* `ember try:each` (Test against multiple ember versions)
* `ember test`
* `ember test --server`

#### Deploying

* See RELEASE.md
