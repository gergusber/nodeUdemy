const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

const isAUth = require("../middleware/is-auth");
router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isAUth, shopController.getCart);

router.post("/cart", isAUth, shopController.postCart);

router.post("/cart-delete-item", isAUth, shopController.postCartDeleteProduct);

router.post("/create-order", isAUth, shopController.postOrder);

router.get("/orders", isAUth, shopController.getOrders);

module.exports = router;
