const { ObjectId } = require("mongodb");
const db = require("../config/mongodb");
const fs = require("fs");
const path = require("path");
const Product = require("../models/product");

const productControllers = {
  getAll(req, res) {
    Product.find()
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  },
};

module.exports = productControllers;
