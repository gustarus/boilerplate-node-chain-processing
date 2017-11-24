'use strict';

const getReadFilePromise = require('./getReadFilePromise');

module.exports = function(path, resolveIfNotExists = true) {
  return getReadFilePromise(path, resolveIfNotExists).then(content => {
    try {
      return JSON.parse(content);
    } catch (e) {
      return null;
    }
  });
};
