'use strict';

const getWriteFilePromise = require('./getWriteFilePromise');

module.exports = function(path, data) {
  return getWriteFilePromise(path, JSON.stringify(data));
};
