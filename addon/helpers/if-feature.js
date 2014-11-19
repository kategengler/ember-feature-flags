import features from '../features';

export function ifFeature( value, options ) {
  var fnTrue = options.fn;
  var fnFalse = options.inverse;

  if( features.enabled(value) ) {
    fnTrue(this);
  }
  else {
    fnFalse(this);
  }
}

export default ifFeature;
