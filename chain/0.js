'use strict';

const {params, log, api, pathToBooksDump} = require('./../process');
const {getReadJsonFilePromise, getWriteJsonFilePromise} = require('../helpers');

function mapResponseToResult(response) {
  return response.items;
}

module.exports = {
  messageBefore: 'Dumping all books by a query.',
  messageAfter: 'The dump is loaded, all is ok!',
  handler() {
    const {query} = params;
    return getReadJsonFilePromise(pathToBooksDump, true).then(data => {
      if (data && data.query === query) {
        log.info(`All books by query ${query} already dumped.`, 1);
        return mapResponseToResult(data.result);
      }

      log.info('The dump isn\'t valid, dumping from the api.', 1);
      return api.get('volumes', {q: query}).then(result => {
        const content = {query, result};

        log.info('Trying to save books dump to the file...', 1);
        return getWriteJsonFilePromise(pathToBooksDump, content).then(() => {
          log.info('The books was successfully dumped!', 1);
          return mapResponseToResult(result);
        });
      });
    })
  }
};
