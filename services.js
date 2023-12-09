const fs = require("fs/promises");
const fse = require("fs-extra");
const booksFile = "books.json";
async function readFile(file) {
  try {
    const fileData = await fs.readFile(file, "utf-8");
    return JSON.parse(fileData);
  } catch (e) {
    throw new Error(e.message);
  }
}

function checkBookExists(books, checkingProps, value) {
  try {
    const book = books?.filter((book) => book[checkingProps] === value);
    return book;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getBooks() {
  try {
    const books = await readFile(booksFile);
    return {
      books: books?.books,
    };
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getBookWithID(id) {
  try {
    const books = await readFile(booksFile);

    const book = checkBookExists(books.books, "id", id);
    return book[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

async function addBooks(dataInfo) {
  try {
    var books;
    try {
      books = await readFile(booksFile);
    } finally {
      const book = checkBookExists(books?.books, "name", dataInfo.name);
      if (book?.length > 0) {
        throw new Error("The Book already exists");
      }
      id = books ? books?.books?.at(-1).id + 1 : 1;
      let data = {};
      data["id"] = id;
      data["name"] = dataInfo.name;
      books?.books?.push(data);
      const dataToWrite = books ? books : { books: [data] };
      fs.writeFile(booksFile, JSON.stringify(dataToWrite));
      return { message: "The data has been updated" };
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {
  getBooks,
  getBookWithID,
  addBooks,
};
