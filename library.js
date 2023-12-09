const express = require("express");
const routeLibrary = express.Router();
const bodyParser = require("body-parser");
const services = require("./services.js");
const e = require("express");

routeLibrary.get("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(404).send({ message: "Invalid id" });
  } else {
    try {
      const book = await services.getBookWithID(parseInt(req.params.id));

      if (book) {
        res.render("book", { status: 200, data: book });
      } else {
        res.render("book", { status: 400, message: "book not found" });
      }
    } catch (e) {
      res.render("book", { status: 400, message: e.message });
    }
  }
});

routeLibrary.get("/", async (req, res) => {
  try {
    const books = await services.getBooks();
    res.render("books", { status: 200, data: books });
  } catch (e) {
    res.render("books", { status: 400, message: e.message });
  }
});

//POST
routeLibrary.use(bodyParser.json());
routeLibrary.use(bodyParser.urlencoded({ extended: false }));

routeLibrary.post("/", async (req, res) => {
  let data = req.body;
  if (data.name && typeof data?.name === "string") {
    try {
      const response = await services.addBooks(data);
      res.status(200).send({ message: response.message });
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  } else {
    res.status(400).send({ message: "check the data" });
  }
});

module.exports = routeLibrary;
