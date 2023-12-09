const express = require("express");
const library = require("./library.js");

const app = express();
app.set("view engine", "pug");


app.use("/books", library);

app.use((req, res, next)=>{
  res.status(404).send({message:"Not Found"});
});

app.listen(3000, () => {
  console.log("Express app is listening on the port 3000!");
});
