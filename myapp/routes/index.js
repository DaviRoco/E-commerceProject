var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/test", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
module.exports = router;
