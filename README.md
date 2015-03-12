
# ember-feature-flags [![Build Status](https://travis-ci.org/kategengler/ember-feature-flags.svg?branch=master)](https://travis-ci.org/kategengler/ember-feature-flags) [![Ember Observer Score](http://emberobserver.com/badges/ember-feature-flags.svg)](http://emberobserver.com/addons/ember-feature-flags)

An ember-cli addon to provide feature flags. 

## To use: 

This addon injects a property `features` onto your routes, controllers, components and views. 

Call `features.setup` with your feature flags and their values:

```js
  // Import to use outside of routes, controllers, components and views.
  import features from 'ember-feature-flags/features'
  features.setup({
    "new-billing-plans": true, 
    "new-homepage": false
  });
```

Any features not included in the object passed to `features.setup()` will be off by default.

Check whether a feature is enabled in a route, controller, helper, component or view, by using `this.features.enabled`:

```js
  export default Ember.Controller.extend({
    plans: function(){
      if (this.features.enabled('new-billing-plans')){
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


Check whether a feature is enabled in a template, using the bound properties: 

```html
  {{#if features.newHomepage}}
    {{link-to "new.homepage"}}
  {{else}}
    {{link-to "old.homepage"}}
  {{/if}}
```

Features are now bound. Use the following api to update them:

```js
  features.enable('newHomepage');
  features.disable('newHomepage');
```

## Configuration options

#### `ENV.LOG_FEATURE_FLAG_MISS`
Will log when a feature flag is queried and found to be off, useful to prevent cursing at the app, 
wondering why your feature is not working.


#### `APP.FEATURES`
The values of `APP.FEATURES` will set when the addon is initialized. Use *either* this or `features.setup()` to prevent clobbering. 

```js
   var ENV = {
       APP: {
         FEATURES: {
           'feature-from-config': true
         }
       }
     };
```
## Test Helpers

To use, import into your test-helper.js: `import 'ember-feature-flags/tests/helpers/with-feature';` 
and add `withFeature` and `withFeatures` to your test `.jshintrc`, they will now be available in all 
of your tests.

For use in unit tests `import {withFeature, withFeatures} from 'ember-feature-flags/tests/helpers/with-feature';`.

#### `withFeature`

Turns on a feature.

Example: 

```js
test( "links go to the new homepage", function () {
  withFeature( 'new-homepage' );
  
  visit('/');  
  click('a.home');
  andThen(function(){
    equal(currentRoute(), 'new.homepage', 'Should be on the new homepage');
  });
});
```

#### `withFeatures`

Turns features on/off using an object hash.

Example: 

```js
test( "links go to the new homepage", function () {
  withFeatures({
    'new-homepage': true,
    'something-else': false
  });
  // the specified features are enabled/disabled
});
```

#### `resetFeatureFlags`
Required complement to `withFeature`, `resetFeatureFlags` resets all feature flags to off, for testing purposes.
Call `resetFeatureFlags()` before starting the app, or inside of `startApp`:

Import into `helpers/start-app.js`: 

```js
import { resetFeatureFlags } from 'ember-feature-flags/tests/helpers/reset-feature-flags';
```

Call `resetFeatureFlags()` before the app is created in `startApp`.

# Development

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Todo

- [ ] Configure `features` injection
