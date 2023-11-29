const Product = require("../models/product");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const productControllers = {
  async getAll(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: "Can't Fetch Data!" }, err?.message);
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }
      res.status(200).json({ message: "Product Found!", product });
    } catch (err) {
      res.status(500).json({ message: "Wrong ID!", error: err?.message });
    }
  },

  async createProduct(req, res) {
    const { name, price, stock, status, image_url } = req.body;
    const newProduct = new Product({ name, price, stock, status, image_url });
    const image = req.file;
    console.log(image);
    try {
      if (image) {
        const target = path.join(
          __dirname,
          "../public/images",
          image.originalname
        );
        fs.renameSync(image.path, target);
        newProduct.image_url = `${process.env.BASE_URL}/static/${image.originalname}`;
        const product = await newProduct.save();
        res.status(200).json({ message: "Product Created!", product });
      } else {
        res.status(400).json({ message: "Image Required!" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Can't Create Product!", error: err?.message });
    }
  },

  async updateProduct(req, res) {
    const { id } = req.params;
    const { name, price, stock, status, image_url } = req.body;
    const image = req.file;
    try {
      const product = await Product.findByIdAndUpdate(
        id,
        {
          name,
          price,
          stock,
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }
      if (image) {
        const target = path.join(
          __dirname,
          "../public/images",
          image.originalname
        );
        fs.renameSync(image.path, target);
        product.image_url = `${process.env.BASE_URL}/static/${image.originalname}`;
        await product.save();
      }
      res.status(200).json({ message: "Product Updated!", product });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Can't Update Product!", error: err?.message });
    }
  },

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }
      res.status(200).json({ message: "Product Deleted!" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Can't Delete Product!", error: err?.message });
    }
  },
};

module.exports = productControllers;
