var express = require("express");
const db = require("./queries");
var router = express.Router();

router.get("/", db.getUsers);

module.exports = router;
