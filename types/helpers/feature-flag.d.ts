import Helper from "@ember/component/helper";
import { Keys } from "ember-feature-flags/services/features";

interface FeatureFlagSignature {
  Args: {
    Positional: [Keys];
  };
}

/** A helper named `feature-flag` to check features in templates */
export default class FeatureFlag extends Helper<FeatureFlagSignature> {}
