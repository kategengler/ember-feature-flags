
# ember-feature-flags [![Build Status](https://travis-ci.org/kategengler/ember-feature-flags.svg?branch=master)](https://travis-ci.org/kategengler/ember-feature-flags) [![Ember Observer Score](http://emberobserver.com/badges/ember-feature-flags.svg)](http://emberobserver.com/addons/ember-feature-flags)

An ember-cli addon to provide feature flags.

### Note to users of `ember.js` >= 3.1
Referencing the features service must be done using `get` as it is a proxy.

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
export default class BillingPlansController extends Controller {
  @service features;
  get plans() {
    if (this.features.isEnabled('newBillingPlans')) {
      // Return new plans
    } else {
      // Return old plans
    }
  }
}
```

Check whether a feature is enabled in a template by using the `feature-flag` template helper:

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
  this.features.enable('newHomepage');
  this.features.disable('newHomepage');
```

Features can be set in bulk, resetting all existing features:

```js
this.features.setup({
  "new-billing-plans": true,
  "new-homepage": false
})
```

You may want to set the flags based on the result of a fetch:

```js
// routes/application.js
@service features;
beforeModel() {
   return fetch('/my-flag/api').then((data) => {
     features.setup(data.json());
  });
}
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

#### `enableFeature` / `disableFeature`

Turns on or off a feature for the test in which it is called.
Requires ember-cli-qunit >= 4.1.0 and the newer style of tests that use `setupTest`, `setupRenderingTest`, `setupApplicationTest`.

Example:
```js
import { enableFeature, disableFeature } from 'ember-feature-flags/test-support';

module('Acceptance | Awesome page', function(hooks) {
  setupApplicationTest(hooks);

  test('it displays the expected welcome message', async function (assert) {
    enableFeature('new-welcome-message');

    await visit('/');

    assert.dom('h1.welcome-message').hasText('Welcome to the new website!');

    disableFeature('new-welcome-message');

    await settled();

    assert.dom('h1.welcome-message').hasText('This is our old website, upgrade coming soon');
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

### TypeScript

The library ships with full support for TypeScript usage with the service, helper, and test helpers. The API described above works as expected, with one additional nicety and one caveat.

**Nicety:** the library provides you the ability to define statically your known feature flags by using a *registry* (as you may be familiar with from the registries for Ember's services, Ember Data models, etc.).  If you define your keys (in kebab case!) in a registry like this:

```ts
// types/index.d.ts, with other types defined for your app


declare module 'ember-feature-flags/services/features' {
  export interface FeaturesRegistry {
    'feature-a': boolean;
    'feature-b': boolean;
  }
}
```

Then in your app code, you will get type checking: TS will require you to use one of those keys (or a camel case variant of it), and reject unknown keys.

```ts
import Component from '@glimmer/component';
import { service } from '@ember/service';
import type Features from 'ember-feature-flags/services/features';

export default class Example extends Component {
  @service declare features: Features;

  get shouldDoSomething() {
    return this.features.isEnabled('feature-a'); // ✅
  }

  get whoops() {
    return this.features.isEnabled('not-a-real-feature'); // ❌
  }
}
```

This applies to all the values. If you do *not* add any keys to the `FeatureFlags` interface, the types will fall back to simply allowing any string and returning a boolean value.

**Caveat:** The runtime uses Ember's `unknownProperty` proxy handling to allow direct access on the service itself with the `get` helper. This allows you to access the features directly in a template:

```hbs
{{#if this.features.featureA}}
  {{! ... }}
{{/if}}
```

For [Glint](https://github.com/typed-ember/glint), this is impossible to support in a way which would not *also* suggest that you could write `this.features.featureA` in your TypeScript code. Doing that will always return `undefined` until we are able to update the library to use native proxies instead of Ember's `unknownProperty()` method. The `feature-flag` helper does *not* have this restriction, so you should prefer that instead. If you still want to use the service directly instead of using the helper, you can use `get`:

```hbs
{{#if (get this.features 'featureA')}}
  {{! ... }}
{{/if}}
```

This will *not* provide autocomplete or type safety, but will work.

#### Stability

This library provides type definitions and follows the current draft of the [Semantic Versioning for TypeScript Types](https://www.semver-ts.org) specification. The public API is all published types. It currently supports TypeScript 4.4, 4.5, and 4.6.

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
