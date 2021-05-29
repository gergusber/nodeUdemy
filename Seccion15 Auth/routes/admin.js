const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

const isAUth = require("../middleware/is-auth");

// /admin/add-product => GET
router.get("/add-product", isAUth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAUth, adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", isAUth, adminController.postAddProduct);

router.get("/edit-product/:productId", isAUth, adminController.getEditProduct);

router.post("/edit-product", isAUth, adminController.postEditProduct);

router.post("/delete-product", isAUth, adminController.postDeleteProduct);

module.exports = router;
