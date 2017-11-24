'use strict';

module.exports = {
  messageBefore: 'Extracting ids for all books.',
  messageAfter: 'All ids extracted!',
  handler: items => items.map(item => item.id).join(', ')
};
