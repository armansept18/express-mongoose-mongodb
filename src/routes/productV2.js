const express = require("express");
const multer = require("multer");
const productControllers = require("../controllers/productV2");
const router = express.Router();
const upload = multer({ dest: "../public/images" });

router.get("/product", productControllers.getAll);
router.get("/product/:id", productControllers.getById);
router.post(
  "/product",
  upload.single("image"),
  productControllers.createProduct
);
router.put(
  "/product/:id",
  upload.single("image"),
  productControllers.updateProduct
);
router.delete("/product/:id", productControllers.deleteProduct);

module.exports = router;
