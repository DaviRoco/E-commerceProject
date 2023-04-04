var express = require("express");
const db = require("./queries");
var router = express.Router();

router.get("/", db.getUsers);
router.get("/:id", db.getUsersById);
router.get("/:email", db.getUsersByEmail);
router.post("/register", db.createUser);
router.put("/", db.updateUser);
router.delete("/:id", db.deleteUser);
module.exports = router;
