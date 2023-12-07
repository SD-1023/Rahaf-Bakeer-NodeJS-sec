const express = require("express");
const library = require("./library.js");

const app = express();

app.use("/books", library);

app.listen(3000, () => {
  console.log("Express app is listening on the port 3000!");
});
