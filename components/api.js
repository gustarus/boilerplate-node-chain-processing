'use strict';

const request = require('request-promise');
const merge = require('lodash.merge');

const getQueryString = require('./../helpers/getQueryString');

module.exports = class {

  constructor(options) {
    this.configure(options);
  }

  configure(options) {
    // pass configuration from options object
    // to the local properties
    for (let name in options) {
      if (options.hasOwnProperty(name)) {
        const value = options[name];
        if (this[name] && options[name] instanceof Object) {
          const defaults = this[name];
          this[name] = merge({}, defaults, value);
        } else {
          this[name] = value;
        }
      }
    }

    return this;
  }

  request(path, method, data = null, custom = null) {
    const params = getQueryString(this.params);
    const query = params ? (path.includes('?') ? '&' : '?') + params : '';
    const url = `${this.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}${query}`;

    // merge all request options
    const options = merge({}, {
      url,
      method,
      json: true,
      form: data
    }, this.options, custom);

    // trace message
    if (this.verbose) {
      console.log('Sending request...', options);
    }

    // send request with passed options
    return request(options).then(response => {
      // trace message
      if (this.verbose) {
        console.log('Response received.', response);
      }

      return response;
    });
  }

  get(path = '', data = null, options = null) {
    const query = getQueryString(data);
    const url = `${path}${query ? '?' + query : ''}`;
    return this.request(url, 'get', null, options);
  }

  post(path, data, options = null) {
    return this.request(path, 'post', data, options);
  }
};
