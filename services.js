const fs = require("fs/promises");
const fse = require("fs-extra");

async function readFile(file) {
  try {
    const fileData = await fs.readFile(file, "utf-8");
    return [JSON.parse(fileData), "data found"];
  } catch (e) {
    let errorMSG = "";
    if (e.code === "ENOENT") {
      errorMSG = "file not found";
      console.log("no such file or directory " + file);
    } else {
      console.log(e.message);
      errorMSG = e.message;
    }
    return [[], errorMSG];
  }
}

async function checkFileExists(file) {
  try {
    await fse.ensureFile(file);
  } catch (e) {
    console.log(e.message);
  }
}

function checkBookExists(books, checkingProps, value) {
  try {
    const book = books?.filter((book) => book[checkingProps] === value);
    if (book?.length === 0) {
      return [[], "book not found"];
    } else {
      return [book, "book found"];
    }
  } catch (e) {
    console.log(e.message);
    return [[], e.message];
  }
}

async function getBooks() {
  try {
    const [books, errorMSG] = await readFile("books.json");
    return {
      books: books?.books,
      success: books?.books ? true : false,
      message: errorMSG,
    };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
}

async function getBookWithID(id) {
  try {
    const [books, errorMSG] = await readFile("books.json");
    if (books.books?.length > 0) {
      const [book, errorMSG2] =
        books?.length !== 0 ? checkBookExists(books["books"], "id", id) : [];
      return {
        book: book,
        success: book?.length > 0 ? true : false,
        message: errorMSG2,
      };
    }
    return { book: [], success: false, message: errorMSG };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
}

async function addBooks(dataInfo) {
  try {
    checkFileExists("books.json");
    var [books, errorMSG] = await readFile("books.json");
    if (books?.length < 0) {
      return { success: false, message: errorMSG };
    }

    const [book, , errorMSG2] =
      books?.length !== 0
        ? checkBookExists(books["books"], "name", dataInfo.name)
        : [];
    if (book?.length > 0) {
      console.log("The Book already exists");

      return { success: false, message: "The Book already exists" };
    } else {
      id = books?.length !== 0 ? books?.books?.at(-1).id + 1 : 1;
      let data = {};
      data["id"] = id;
      data["name"] = dataInfo.name;
      data["author"] = dataInfo.author;
      data["description"] = dataInfo.description;
      books?.books?.push(data);
      const dataToWrite = books?.length !== 0 ? books : { books: [data] };
      fs.writeFile("books.json", JSON.stringify(dataToWrite));
      return { success: true, message: "The data has been updated" };
    }
  } catch (e) {
    console.log(e.message);
    return { success: false, message: "error has occurred" + e.message };
  }
}

module.exports = {
  getBooks,
  getBookWithID,
  addBooks,
};
