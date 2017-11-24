'use strict';

const fs = require('fs');
const restler = require('restler');

module.exports = function(path, url, field, mime) {
  return new Promise(resolve => {
    fs.stat(path, (error, stats) => {
      const form = {
        multipart: true,
        data: {
          [field]: restler.file(path, null, stats.size, null, mime)
        }
      };

      restler.post(url, form).on('complete', data => {
        resolve(data);
      });
    });
  })
};
