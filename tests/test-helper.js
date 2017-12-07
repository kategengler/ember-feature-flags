import './helpers/with-feature';
import './helpers/without-feature';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);
