import 'ember-feature-flags/tests/helpers/with-feature';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);
