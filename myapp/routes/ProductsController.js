var express = require("express");
const db = require("./queries");
var router = express.Router();

router.get("/", db.getProducts);
router.get("/:id", db.getProductsById);
router.post("/", db.createProducts);
router.put("/", db.updateProducts);
router.delete("/:id", db.deleteProducts);
module.exports = router;
