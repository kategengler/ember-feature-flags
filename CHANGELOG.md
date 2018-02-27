# CHANGELOG

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
