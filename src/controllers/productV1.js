const { ObjectId } = require("mongodb");
const db = require("../config/mongodb");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const productControllers = {
  async getAll(req, res) {
    try {
      const products = await db.collection("products").find().toArray();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: "Can't Fetch Data!" }, err?.message);
    }
  },
  async getById(req, res) {
    const { id } = req.params;
    try {
      const objectId = new ObjectId(id);
      const existingProduct = await db
        .collection("products")
        .findOne({ _id: objectId });
      if (!existingProduct) {
        return res.status(404).send({
          message: "Product Not Found!",
        });
      } else {
        return res.status(200).json(existingProduct);
      }
    } catch (err) {
      res.status(500).send(err?.message);
    }
  },
  async createProduct(req, res) {
    const { name, price, stock, status, image_url } = req.body;
    const image = req.file;
    console.log(req.file);
    try {
      if (image) {
        const target = path.join(
          __dirname,
          "../public/images",
          image.originalname
        );
        fs.renameSync(image.path, target);
        await db.collection("products").insertOne({
          name,
          price,
          stock,
          status,
          image_url: `${process.env.PORT}/${image.originalname}`,
        });
        res.send({
          message: "Product Created!",
          result,
        });
      }
    } catch (err) {
      res.status(500).send(err?.message);
    }
  },
  async editProduct(req, res) {
    const { id } = req.params;
    const { name, price, stock, status, image_url } = req.body;
    const image = req.file;
    try {
      const objectId = new ObjectId(id);
      const existingProduct = await db
        .collection("products")
        .findOne({ _id: objectId });
      if (image) {
        const target = path.join(
          __dirname,
          "../public/images",
          image.originalname
        );
        fs.renameSync(image.path, target);
      }
      if (!existingProduct) {
        return res.status(404).json({ message: "Product Not Found!" });
      } else {
        await db.collection("products").updateOne(
          { _id: objectId },
          {
            $set: {
              name,
              price,
              stock,
              status,
              image_url: `${process.env.PORT}/${image.originalname}`,
            },
          }
        );
        return res.status(200).json({ message: "Product Updated!" });
      }
    } catch (err) {
      res.status(500).json({ message: "Can't Update Product!" }, err?.message);
    }
  },
  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const objectId = new ObjectId(id);
      const existingProduct = await db
        .collection("products")
        .findOne({ _id: objectId });
      if (!existingProduct) {
        return res.status(404).json({ message: "Product Not Found!" });
      } else {
        await db.collection("products").deleteOne({ _id: objectId });
        return res.status(200).json({ message: "Product Deleted!" });
      }
    } catch (err) {
      res.status(500).json({
        message: err?.message,
      });
    }
  },
};

module.exports = productControllers;
