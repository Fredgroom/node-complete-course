const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  console.log("this is / talking");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("add-product");
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title'/><button type='submit'>Add Product</button></form>"
  );
});

app.listen(3000);
