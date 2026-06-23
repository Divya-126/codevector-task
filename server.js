require("dotenv").config();

const express = require("express");

const productRoutes = require("./src/routes/productRoutes");

const app = express();

app.use(express.json());

app.use("/products", productRoutes);

app.listen(5000, () => {
  console.log("Server Running");
});
