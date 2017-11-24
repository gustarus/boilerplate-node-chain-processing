'use strict';

const fs = require('fs');
const path = require('path');

const DEFAULT_MESSAGE_BEFORE = 'Executing a next part.';
const DEFAULT_MESSAGE_AFTER = 'The part was executed!';
const DEFAULT_MESSAGE_SUCCESS = 'The task was successful.';
const DEFAULT_MESSAGE_RESULT = 'Execution result.';
const DEFAULT_MESSAGE_ERROR = 'Error happened.';

// require all steps from the folder
let chain = [];
const normalizedPath = path.join(__dirname, 'chain');
fs.readdirSync(normalizedPath).forEach(file => {
  chain.push(require('./chain/' + file));
});

// run then chain with success and error events handlers
const {config, log} = require('./process');
const promise = new Promise(resolve => resolve());
chain.reduce((stack, part) => {
  return stack.then(result => {
    log.notice('\n' + (part.messageBefore || DEFAULT_MESSAGE_BEFORE));
    return part.handler(result);
  }).then(result => {
    log.success(part.messageAfter || DEFAULT_MESSAGE_AFTER, 1);
    return result;
  });
}, promise).then(result => {
  log.success('\n' + (config.messages.success || DEFAULT_MESSAGE_SUCCESS));

  if (result) {
    log.notice('\n' + (config.messages.result || DEFAULT_MESSAGE_RESULT));
    log.info(result)
  }
}).catch(error => {
  const message = '\n' + (error.message || config.messages.error || DEFAULT_MESSAGE_ERROR);
  log.error(message);
});
