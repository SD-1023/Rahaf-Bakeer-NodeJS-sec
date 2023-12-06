const fs = require("fs/promises");
const fse = require("fs-extra");

async function readFile(file) {
  try {
    const fileData = await fs.readFile(file, "utf-8");
    return JSON.parse(fileData);
  } catch (e) {
    if (e.code === "ENOENT") {
      console.log("no such file or directory " + file);
    } else {
      console.log(e.message);
    }
    return [];
  }
}

async function checkFileExists(file) {
  try {
    await fse.ensureFile(file);
    console.log("Checking");
  } catch (e) {
    console.log(e.message);
  }
}

function checkBookExists(books, checkingProps, value) {
  try {
    const book = books?.filter((book) => book[checkingProps] === value);
    if (book?.length === 0) {
      return [];
    } else {
      return book;
    }
  } catch (e) {
    console.log(e.message);
    return [];
  }
}

async function getBooks() {
  try {
    const books = await readFile("books.json");
  
    return {"books":books?.books,"success":books?.books ? true : false};
  } catch (e) {
    console.log(e.message);
    return {"success":false};
    
  }
}

async function getBookWithID(id) {
  try {
    const books = await readFile("books.json");
    const book =books?.length !== 0 ? checkBookExists(books["books"], "id", id) : [];
      return {"book":book,"success":book?.length>0 ? true : false};

  } catch (e) {
    console.log(e.message);
    return {"success":false};

  }
}

async function addBooks(dataInfo) {
  try {
    checkFileExists("books.json");
    var books = await readFile("books.json");

    const book =
      books?.length !== 0 ? checkBookExists(books["books"], "name", dataInfo.name) : [];
    if (book?.length > 0) {
      return {"success":false,"message":"The Book already exists"};

      console.log("The Book already exists");
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
      return {"success":true,"message":"The data has been updated"};
    }
  } catch (e) {
    console.log(e.message);
    return {"success":false,"message":"error has occurred"+e.message};
  }
}



module.exports={
  getBooks,
  getBookWithID,
addBooks
}
// console.log("fghjykl")
// getBookWithID(5);

// addBooks(

//     "Sapienssssss: A Brief History of Humankind",
//    "Yuval Noah Harari",
//  "An exploration of the history and impact of Homo sapiens, from the emergence of Homo sapiens in Africa to the present day."
//   )

// getBooks();
