'use strict';

const Log = require('./components/log');
const Api = require('./components/api');

module.exports = {
  components: {
    log: {
      constructor: Log
    },

    api: {
      constructor: Api,
      baseUrl: 'https://www.googleapis.com/books/v1',
      // verbose: true,
      // json: false
    }
  },

  paths: {
    pathToBooksDump: '@runtime/books.json'
  },

  messages: {
    // success: 'Changed success message for the task.',
    // result: 'Changed result message for the task.',
    // error: 'Changed error message for the task.'
  }
};
