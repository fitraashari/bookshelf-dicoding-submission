const { AddBooksHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: AddBooksHandler,
  },
];
module.exports = routes;
