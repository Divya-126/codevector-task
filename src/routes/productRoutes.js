const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController");

console.log(controller);

router.get("/", controller.getProducts);

module.exports = router;
