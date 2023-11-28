const router = require("express").Router();
const multer = require("multer");
const productControllers = require("../controllers/productV1");
const upload = multer({ dest: "images" });

router.get("/product", productControllers.getAll);
router.get("/product/:id", productControllers.getById);
router.post(
  "/product/",
  upload.single("image"),
  productControllers.createProduct
);
router.put("/product/:id", productControllers.editProduct);
router.delete("/product/:id", productControllers.deleteProduct);

module.exports = router;
