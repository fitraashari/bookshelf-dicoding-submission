const { nanoid } = require('nanoid');
const books = require('./books');

const AddBooksHandler = (request, h) => {
  const id = nanoid(16);
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = { ...request.payload };
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const newBook = {
    // eslint-disable-next-line max-len
    id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt,
  };
  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id);
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request) => {
  let result = books;
  if (request.query.name || request.query.reading || request.query.finished) {
    if (request.query.name) {
      result = result.filter((buku) => {
        const namaBuku = buku.name.toLowerCase();
        const qrNama = request.query.name.toLowerCase();
        return namaBuku.includes(qrNama);
      });
    }
    if (request.query.reading === '1' || request.query.reading === '0') {
      const reading = (request.query.reading === '1');
      result = result.filter((buku) => buku.reading === reading);
    }
    if (request.query.finished === '1' || request.query.finished === '0') {
      const finished = (request.query.finished === '1');
      result = result.filter((buku) => buku.finished === finished);
    }
  }
  result = result.map((buku) => {
    const res = { id: buku.id, name: buku.name, publisher: buku.publisher };
    return res;
  });
  return {
    status: 'success',
    data: {
      books: result,
    },
  };
};

const getBooksByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((bk) => bk.id === bookId)[0];
  if (!book) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  const response = h.response({
    status: 'success',
    data: {
      book,
    },
  });
  response.code(200);
  return response;
};

const updateBooksHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = { ...request.payload };
  const updatedAt = new Date().toISOString();
  const finished = (pageCount === readPage);
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const index = books.findIndex((book) => book.id === bookId);
  if (index < 0) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  };
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};

const deletesBookHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);
  if (index < 0) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  books.splice(index, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
};

module.exports = {
  AddBooksHandler, getAllBooksHandler, getBooksByIdHandler, updateBooksHandler, deletesBookHandler,
};
