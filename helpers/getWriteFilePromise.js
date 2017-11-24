'use strict';

const fs = require('fs');

module.exports = function(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, error => {
      if (error) {
        reject(error);
      }

      resolve(path);
    });
  });
};
