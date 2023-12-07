const express = require("express");
const routeLibrary = express.Router();
const bodyParser = require("body-parser");
const services = require("./services.js");

routeLibrary.get("/:id", async (req, res) => {
  const book = await services.getBookWithID(parseInt(req.params.id));
  res
    .status(book?.success === true ? 200 : 500)
    .send(book?.success ? { book: book.book } : { errorMsg: book.message });
});

routeLibrary.get("/", async (req, res) => {
  const books = await services.getBooks();
  console.log(books);
  res
    .status(books?.success === true ? 200 : 400)
    .send(books?.success === true ? books : { errorMsg: books.message });
});

//POST
routeLibrary.use(bodyParser.json());
routeLibrary.use(bodyParser.urlencoded({ extended: false }));

routeLibrary.post("/", async (req, res) => {
  let data = req.body;
  const book = await services.addBooks(data);
  res
    .status(book?.success === true ? 200 : 500)
    .send({ message: book.message });
});

module.exports = routeLibrary;
