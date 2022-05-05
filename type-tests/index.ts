import { expectTypeOf } from "expect-type";
import Helper from "@ember/component/helper";
import type Features from "ember-feature-flags/services/features";
import {
  enableFeature,
  disableFeature,
} from "ember-feature-flags/test-support";
import FeatureFlag from "ember-feature-flags/helpers/feature-flag";

// side-effect import for `withFeature`
import "ember-feature-flags/test-support/helpers/with-feature";

expectTypeOf(enableFeature).toEqualTypeOf<(name: string) => void>();
expectTypeOf(enableFeature("hello")).toEqualTypeOf<void>();
expectTypeOf(disableFeature).toEqualTypeOf<(name: string) => void>();
expectTypeOf(disableFeature("hello")).toEqualTypeOf<void>();

// globally available because of the side effect import
expectTypeOf(withFeature).toEqualTypeOf<(name: string) => void>();
expectTypeOf(withFeature("hello")).toEqualTypeOf<void>();

// The default for all the methods, if you don't add to the registry, is to
// simply use a string key lookup. See `./with-registry/index.ts` for testing
// when there *is* a registry.
declare let features: Features;
expectTypeOf(features.setup).toEqualTypeOf<
  (config: Record<string, boolean>) => void
>();

expectTypeOf(features.isEnabled).toEqualTypeOf<(key: string) => boolean>();
expectTypeOf(features.get).toEqualTypeOf<(key: string) => boolean>();
expectTypeOf(features.enable).toEqualTypeOf<
  (key: string, value: boolean) => void
>();
expectTypeOf(features.disable).toEqualTypeOf<
  (key: string, value: boolean) => void
>();
expectTypeOf(features.flags).toEqualTypeOf<Array<string>>();

expectTypeOf<FeatureFlag>().toEqualTypeOf<
  Helper<{
    Args: {
      Positional: [string];
    };
  }>
>();
