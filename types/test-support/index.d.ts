import { Keys } from "ember-feature-flags/services/features";

/**
 * Turns on or off a feature for the test in which it is called. Requires
 * ember-cli-qunit >= 4.1.0 and the newer style of tests that use `setupTest`,
 * `setupRenderingTest`, `setupApplicationTest`.
 *
 * @param name The feature to enable
 */
export function enableFeature(name: Keys): void;

/**
 * Turns on or off a feature for the test in which it is called. Requires
 * ember-cli-qunit >= 4.1.0 and the newer style of tests that use `setupTest`,
 * `setupRenderingTest`, `setupApplicationTest`.
 *
 * @param name The feature to disable
 */
export function disableFeature(name: Keys): void;
