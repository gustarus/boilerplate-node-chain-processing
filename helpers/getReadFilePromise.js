'use strict';

const fs = require('fs');

module.exports = function(path, resolveIfNotExists = true) {
  return new Promise((resolve, reject) => {
    fs.exists(path, (exists) => {
      if (exists) {
        fs.readFile(path, 'utf8', (error, data) => {
          if (error) {
            return reject(error);
          }

          resolve(data);
        });
      } else if (resolveIfNotExists) {
        resolve(null);
      } else {
        reject('Unable to read file.');
      }
    });
  });
};
