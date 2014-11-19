# ember-feature-flags [![Build Status](https://travis-ci.org/kategengler/ember-feature-flags.svg?branch=master)](https://travis-ci.org/kategengler/ember-feature-flags)
An ember-cli addon to provide feature flags. 

## To use: 

Provide a global, `window.Features`, with your feature flags and their values:

```js
  window.Features = {
    "new-billing-plans": true, 
    "new-homepage": false
  }
```

Any features not included in `window.Features` will be off by default.

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

Check whether a feature is enabled in a template, using the provided `#ff` handlebars helper: 

```html
  {{#if-feature 'new-homepage'}}
    {{link-to "new.homepage"}}
  {{else}}
    {{link-to "old.homepage"}}
  {{/if-feature}}
```

Note that features are not bound, updating `window.Features` will not live-toggle features.

## Configuration options

#### `ENV.LOG_FEATURE_FLAG_MISS`
Will log when a feature flag is queried and found to be off, useful to prevent cursing at the app, 
wondering why your feature is not working.

## Test Helpers

#### `withFeature`
Turns on a feature for the test in which it is called. 
To use, import into your test-helper.js: `import 'ember-feature-flags/tests/helpers/with-feature';` and add to your 
test `.jshintrc`, it will now be available in all of your tests.

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

#### `resetFeatureFlags`
Required compliment to `withFeature`, `resetFeatureFlags` resets all feature flags to off, for testing purposes.
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

- [ ] Allow setting features a way other than a global
