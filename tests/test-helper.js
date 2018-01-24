import 'ember-feature-flags/test-support/helpers/with-feature';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);
