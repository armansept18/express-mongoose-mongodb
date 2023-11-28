const express = require("express");
const productControllers = require("../controllers/productV2");
const route = express.Router();

route.get("/products", productControllers.getAll);

module.exports = route;
