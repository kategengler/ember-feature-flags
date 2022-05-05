declare global {
  /**
   * "Old"-style acceptance tests can utilize `withFeature` test helper to turn on
   * a feature for the test. To use, import into your `test-helper.js`: `import
   * 'ember-feature-flags/test-support/helpers/with-feature'` and add to your test
   * `.jshintrc`, it will now be available in all of your tests.
   *
   *
   */
  export function withFeature(name: string): void;
}

// Shut off "exporting" mode so that the global enhancement works per the API
// as designed.
export {};
