var express = require("express");
const db = require("./queries");
var router = express.Router();

router.get("/", db.getOrders);
router.get("/:id", db.getOrdersById);
router.post("/", db.createOrders);
router.put("/", db.updateOrders);
router.delete("/:id", db.deleteOrders);
module.exports = router;
