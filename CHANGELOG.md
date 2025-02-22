# CHANGELOG






## Release (2025-02-22)

ember-feature-flags 8.0.0 (major)

#### :boom: Breaking Change
* `ember-feature-flags`
  * [#133](https://github.com/kategengler/ember-feature-flags/pull/133) Remove normalization of feature flags. Previously feature flags were converted to camelcase internally. ([@kategengler](https://github.com/kategengler))
    * Flags were converted to camelcase for storage and for later reference since they
      could be referenced as properties on the Features service. Now, since
      the only APIs to reference flags are as strings or keys, what you pass
      in is what you should also pass in to check the values.

      Previously:
      ```
      this.features.setup({
        'foo-bar': true,
        'barBaz': false
      });
      ```
      
      Could be checked by using `this.features.isEnabled('fooBar')` or
      `this.features.isEnabled('bar-baz')`. Now both should be referenced as
      they are set: `this.features.isEnabled('foo-bar')` or
      `this.isEnabled('barBaz')`.
   

#### Committers: 1
- Katie Gengler ([@kategengler](https://github.com/kategengler))

## Release (2025-02-22)

ember-feature-flags 7.0.0 (major)

#### :boom: Breaking Change
* `ember-feature-flags`
  * [#131](https://github.com/kategengler/ember-feature-flags/pull/131) Upgrade and modernize ember-feature-flags ([@kategengler](https://github.com/kategengler))
    * Remove deprecated `withFeature` test helper ... `enableFeature` is the modern helper
    * Remove deprecated proxy behavior of the Features service. `features.myFlag` and `features.get('myFlag')` are no longer available. Use `features.isEnabled('myFlag')` or the `feature-flag` template helper
    * Update the features service to use tracked instead of the old Ember reactivity system. Flags are now stored as a TrackedMap
    * Update the minimum Node version to Node 18
    * Support Ember >= 4.12. For older versions use ember-feature-flags@6.1.0

#### Committers: 1
- Katie Gengler ([@kategengler](https://github.com/kategengler))

## v6.1.0 (2025-02-11)

#### :boom: Deprecations
* [#129](https://github.com/kategengler/ember-feature-flags/pull/129) Deprecate features that will be removed in 7.0 to facilitate modernization ([@kategengler](https://github.com/kategengler))
  * Deprecate withFeature test helper from old-style Ember tests
  * Deprecate the proxy behavior of the features service. In 7.0,
    `features.myFeature` and `features.get('myFeature')` will no longer
    work. Use `isEnabled` and the `{{feature-flag}}` template helper
    instead.

#### :rocket: Enhancement
* [#97](https://github.com/kategengler/ember-feature-flags/pull/97) Add `disableFeature` test helper ([@Techn1x](https://github.com/Techn1x))

#### :memo: Documentation
* [#103](https://github.com/kategengler/ember-feature-flags/pull/103) Update docs examples ([@jeffdaley](https://github.com/jeffdaley))

#### :house: Internal
* [#123](https://github.com/kategengler/ember-feature-flags/pull/123) CI: fix linting and add missing scenarios to compat tests  ([@SergeAstapov](https://github.com/SergeAstapov))
* [#120](https://github.com/kategengler/ember-feature-flags/pull/120) Introduce GitHub Actions config ([@chriskrycho](https://github.com/chriskrycho))

#### Committers: 5
- Brad Overton ([@Techn1x](https://github.com/Techn1x))
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))
- Jeff Daley ([@jeffdaley](https://github.com/jeffdaley))
- Katie Gengler ([@kategengler](https://github.com/kategengler))
- Sergey Astapov ([@SergeAstapov](https://github.com/SergeAstapov))

## v6.0.0 (2019-10-23)

#### :boom: Breaking Change
* [#84](https://github.com/kategengler/ember-feature-flags/pull/84) Drop support for Node versions < 8

#### :bug: Bug Fix
* [#83](https://github.com/kategengler/ember-feature-flags/pull/83) Fix deprecation warning for computed.volatile

## v5.0.0 (2018-02-27)

#### :boom: Breaking Change :bug: Bug Fix
* [#71](https://github.com/kategengler/ember-feature-flags/pull/71) Update new style testing helpers usage to support integration tests. ([@SergeAstapov](https://github.com/SergeAstapov))
  Breaking Change: No longer pass this.owner into `enableFeature`, it is now just `enableFeature('foo')`

#### :house: Internal
* [#52](https://github.com/kategengler/ember-feature-flags/pull/52) npmignore coverage directory. ([@akatov](https://github.com/akatov))

#### Committers: 2
- Dmitri Akatov ([akatov](https://github.com/akatov))
- Sergey Astapov ([SergeAstapov](https://github.com/SergeAstapov))

## v4.2.0 (2018-02-02)

#### :rocket: Enhancement
* [#67](https://github.com/kategengler/ember-feature-flags/pull/67) Support RFC 268 testing style. ([@SergeAstapov](https://github.com/SergeAstapov))
* [#68](https://github.com/kategengler/ember-feature-flags/pull/68) Add public `flags` computed property. ([@SergeAstapov](https://github.com/SergeAstapov))

#### :house: Internal
* [#70](https://github.com/kategengler/ember-feature-flags/pull/70) Set up travis to release on pushed tag and document release process. ([@kategengler](https://github.com/kategengler))
* [#69](https://github.com/kategengler/ember-feature-flags/pull/69) Add yarn. ([@kategengler](https://github.com/kategengler))

#### Committers: 2
- Katie Gengler ([kategengler](https://github.com/kategengler))
- Sergey Astapov ([SergeAstapov](https://github.com/SergeAstapov))

## v4.1.0
- Add `feature-flag` helper for use in templates (Thanks @SergeAstapov)

## v4.0.0
- Remove default injection of the `features` service, it must now be explicitly injected where you want to use it. (Thanks @SergeAstapov)
- Remove configuration option for the name of the default injected features service. (Thanks @SergeAstapov) 
- Move test helper `withFeature` to `addon-test-support`, it should now be imported from `ember-feature-flags/test/helpers/with-feature` (Thanks @SergeAstapov)

## v3.0.1
- Deprecate default injection of the `features` service, it must now be explicitly injected where you want to use it. (Thanks @SergeAstapov)
 
## v3.0.0
- `features` is now a Ember.Service. It is still injected by default, and at the configured name into routes, controllers and components. This may be a breaking change if you were injecting the service elsewhere. The injection is now `service:<configured name>`.
- Bugfix: LOG_FEATURE_FLAG_MISS should now work
- Deprecated features have been removed: `features.enabled` (which became `features.isEnabled`), `resetFeatureFlags` test helper (no longer needed), setting feature flags via APP.FEATURES
- `features.setup` will now `notifyPropertyChange` for the flags set (Thanks @jcope2013)
- Test helpers are now in the `test-support` folder that will merge with host app's test directory

## v2.0.1
- Fix deprecations that started with Ember 2.1 (Thanks @Arkham)
- Upgrade ember-cli
- Test against Ember 1.12 -> canary

## v2.0.0
- Breaking: Upgraded ember-cli and ember to 1.13 series, tests no longer pass against ember 1.11 and so compatibility is now >=1.12.0. 
  Suspect the addon will still work under 1.11 and that the failures are due to ember-cli interactions.
- Eliminate deprecations in app and test suite

## v1.1.0
- Upgrade ember-cli

## v1.0.0
- 1.0 because its been used in production for months and we're making changes with nice deprecations
- `resetFeatureFlags` is no longer necessary to reset flags between tests; flags are not shared between app instances anymore
- `enabled` renamed to `isEnabled`
- Flags should now be set via the `featureFlags` key in the config, rather than `APP.FEATURES`
- The service name can now be customized using `featureFlagsService` config 

## v0.0.4
- Upgrade to ember-cli 0.0.2

## v0.0.3
- Breaking change: Remove use of window.Features; flags can now be specified in config or explicitly setup with `features.setup`
- Breaking change: Remove handlebars helper - compatibility with htmlbars
- Feature: Feature flags are now bound in templates with regular `if` statements, in a camelized form ('new-feature' becomes 'newFeature'). See Readme.
- Bugfix: Logging now turns off if the config flag is off.

## v0.0.1, v0.0.2
- Initial commit
