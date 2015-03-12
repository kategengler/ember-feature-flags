#v0.0.4
- Upgrade to ember-cli 0.0.2

#v0.0.3
- Breaking change: Remove use of window.Features; flags can now be specified in config or explicitly setup with `features.setup`
- Breaking change: Remove handlebars helper - compatibility with htmlbars
- Feature: Feature flags are now bound in templates with regular `if` statements, in a camelized form ('new-feature' becomes 'newFeature'). See Readme.
- Bugfix: Logging now turns off if the config flag is off.

#v0.0.1, v0.0.2
- Initial commit
