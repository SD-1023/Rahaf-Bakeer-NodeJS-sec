const express = require("express");
const routeLibrary = express.Router();
const bodyParser = require("body-parser");
const services = require("./services.js");

routeLibrary.get("/:id", async (req, res) => {
  if (isNaN(req.params.id)){
    res.status(404).send( { message: "Invalid id" });
  }
  else{
  const book = await services.getBookWithID(parseInt(req.params.id));
  res
    .status(book?.success === true ? 200 : 204)
    .send(book?.success ? { book: book.book } : { message: book.message });
  }
});

routeLibrary.get("/", async (req, res) => {
  const books = await services.getBooks();
  res.render("books",{"status":books?.success === true ? 200 : 500,"data":books?.success === true ? books : { message: books.message }});
    // res.status(books?.success === true ? 200 : 204)
    // .send(books?.success === true ? books : { message: books.message });
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
