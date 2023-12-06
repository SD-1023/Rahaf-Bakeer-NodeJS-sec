const express = require('express');
const routeLibrary = express.Router();
const bodyParser=require('body-parser');
const services=require('./services.js');
routeLibrary.get('/', async (req, res) => {
  const books =await services.getBooks();
  console.log(books)
    res.status(books?.success===true ? 200 : 204).send(books?.success===true ? books : {"books":[]});
  })




  routeLibrary.get('/:id', async (req, res) => {
    const book=await services.getBookWithID(parseInt(req.params.id));
    console.log(book);
    res.status(book?.success===true ? 200 : 204).send({"book":book.book});
  })



  //POST
  routeLibrary.use(bodyParser.json())
  routeLibrary.use(bodyParser.urlencoded({ extended: false }))

 
  routeLibrary.post('/', async (req, res) => {
    let data = req.body;
    const book=await services.addBooks(data);
    console.log(book)
    res.status(book?.success===true ? 200 : 500).send({"message":book.message});
  })


module.exports=routeLibrary;