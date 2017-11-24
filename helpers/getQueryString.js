'use strict';

/**
 * Encode data object as query string.
 * Recursion used inside.
 * For example:
 *  {first: 1, object: {second: 2}}
 * Will be converted to:
 *  first=1&object%5Bsecond%5D=2
 * @param obj
 * @param prefix
 * @returns {*}
 */
function serialize(obj, prefix) {
  if (!obj) {
    return '';
  }

  let str = [], p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? `${prefix}[${p}]` : p, v = obj[p];
      const value = (v !== null && typeof v === 'object')
        ? serialize(v, k)
        : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;

      str.push(value);
    }
  }

  return str.join('&');
}

module.exports = serialize;
