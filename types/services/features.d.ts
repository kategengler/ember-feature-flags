import Service from "@ember/service";

/**
 * If there are keys in the registry, require them to be the keys used in the
 * config (though they can be left off and will default to false).
 */
type AllowedConfig = keyof FeaturesRegistry extends never
  ? Record<string, boolean>
  : Partial<Record<keyof FeaturesRegistry, boolean>>;

/**
 * Get a version of an object whose keys are camel-cased.
 */
type Camelized<O, K extends keyof O = keyof O> = {
  [Key in CamelCased<K>]: O[K];
};

type Keys = keyof FeaturesRegistry extends never
  ? string
  : keyof FeaturesRegistry | keyof Camelized<FeaturesRegistry>;

type CamelCased<S> = S extends string
  ? S extends `${infer A}-${infer B}${infer C}`
    ? `${Uncapitalize<A>}${Capitalize<B>}${CamelCased<C>}`
    : `${Uncapitalize<S>}`
  : never;

/**
 * A service named `features` available for injection into your routes,
 * controllers, components, etc.
 */
// we are using an interface instead of a class since this is not intended to
// be  subclassed and needs to change the behavior of `get`
export default interface Features extends Omit<Service, "get"> {
  /**
   * Enable or disable features in bulk.
   *
   * NOTE: `setup` methods reset previously setup flags and their state.
   */
  setup(config: AllowedConfig): void;

  /** Enable a feature at runtime. */
  enable<K extends Keys>(key: K, value: boolean): void;

  /** Disable a feature at runtime. */
  disable<K extends Keys>(key: K, value: boolean): void;

  /** Check if a feature is enabled. */
  isEnabled<K extends Keys>(key: K): boolean;

  /**
   * Features are also available as camel-cased properties of `features`, but
   * behind a proxy, so you can only access them safely using `get`.
   *
   * ```ts
   * import Controller from '@ember/controller';
   * import { service } from '@ember/service';
   * import type Features from 'ember-feature-flags/services/features';
   *
   * export default class BillingPlansController extends Controller {
   *   @service declare features:  Features;
   *
   *   get plans() {
   *     if (this.features.get('newBillingPlans')) {
   *       // Return new plans
   *     } else {
   *       // Return old plans
   *     }
   *   }
   * }
   * ```
   */
  get<K extends Keys>(key: K): boolean;

  flags: Keys;
}

/**
 * Registry of settings. Provide the kebab-case (`"foo-bar"`) setting name here
 * and both kebab– and camel-case will be available for type-powered
 * autocomplete etc.
 */
export interface FeaturesRegistry {}
