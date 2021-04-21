const {
  AddBooksHandler, getAllBooksHandler, getBooksByIdHandler, updateBooksHandler, deletesBookHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: AddBooksHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBooksHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deletesBookHandler,
  },
];
module.exports = routes;
