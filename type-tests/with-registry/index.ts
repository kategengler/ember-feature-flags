import { expectTypeOf } from "expect-type";
import Features from "ember-feature-flags/services/features";
import Helper from "@ember/component/helper";
import {
  enableFeature,
  disableFeature,
} from "ember-feature-flags/test-support";
import FeatureFlag from "ember-feature-flags/helpers/feature-flag";

// @ts-expect-error -- we have *not* done the side-effect import in this test,
// so there is no `withFeature` in the global scope!
withFeature("whatever", true);

declare module "ember-feature-flags/services/features" {
  export interface FeaturesRegistry {
    simple: boolean;
    "with-dash": boolean;
  }
}

expectTypeOf(enableFeature).parameters.toEqualTypeOf<
  ["simple" | "withDash" | "with-dash"]
>();
expectTypeOf(disableFeature).parameters.toEqualTypeOf<
  ["simple" | "withDash" | "with-dash"]
>();

declare let features: Features;

// @ts-expect-error -- no calling it without args at all
features.setup();
// no keys is allowed (though: why would you do that?)
expectTypeOf(features.setup({})).toEqualTypeOf<void>();
// any key actually set up is allowed
expectTypeOf(features.setup({ "with-dash": true })).toEqualTypeOf<void>();
expectTypeOf(features.setup({ simple: false })).toEqualTypeOf<void>();
expectTypeOf(
  features.setup({
    "with-dash": false,
    simple: true,
  })
).toEqualTypeOf<void>();
// But random keys are *not* allowed
// @ts-expect-error
features.setup({ otherShenanigans: false });

// Both kebab and camel-case are supported
expectTypeOf(features.isEnabled).parameters.toEqualTypeOf<
  ["withDash" | "with-dash" | "simple"]
>();
// But random keys are disallowed if using the registry
// @ts-expect-error
features.isEnabled("whatever");

// Both kebab and camel-case are supported
expectTypeOf(features.get).parameters.toEqualTypeOf<
  ["withDash" | "with-dash" | "simple"]
>();
// But random keys are disallowed if using the registry
// @ts-expect-error
features.get("whatever");

expectTypeOf(features.enable)
  .parameter(0)
  .toEqualTypeOf<"withDash" | "with-dash" | "simple">();
expectTypeOf(features.enable).parameter(1).toEqualTypeOf<boolean>();
// But random keys are disallowed if using the registry
// @ts-expect-error
features.enable("whatever", true);

expectTypeOf(features.disable)
  .parameter(0)
  .toEqualTypeOf<"withDash" | "with-dash" | "simple">();
expectTypeOf(features.disable).parameter(1).toEqualTypeOf<boolean>();
// But random keys are disallowed if using the registry
// @ts-expect-error
features.disable("whatever", true);

expectTypeOf(features.flags).toEqualTypeOf<
  Array<"simple" | "withDash" | "with-dash">
>();

expectTypeOf<FeatureFlag>().toEqualTypeOf<
  Helper<{
    Args: {
      Positional: ["simple" | "withDash" | "with-dash"];
    };
  }>
>();
declare let ff: FeatureFlag;
