'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');

module.exports = function(url, path) {
  const file = fs.createWriteStream(path);
  return new Promise((resolve,reject) => {
    const processor = url.includes('http://') ? http : https;
    processor.get(url, response => {
      response.pipe(file);
      response.on('end', () => {
        resolve(path);
      });
    });
  });
};
