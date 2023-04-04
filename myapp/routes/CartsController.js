var express = require("express");
const db = require("./queries");
var router = express.Router();

router.get("/", db.getCarts);
router.get("/:id", db.getCartsById);
router.post("/", db.createCarts);
router.delete("/:id", db.deleteCarts);
module.exports = router;
