var express = require("express");
const db = require("./queries");
var router = express.Router();

router.get("/", db.getCarts);
router.get("/:id", db.getCartsById);
router.get("/user/:id", db.getCartsByUserId);
router.post("/", db.createCarts);
router.post("/:id/checkout", db.checkoutCart);
router.delete("/:id", db.deleteCarts);
module.exports = router;
