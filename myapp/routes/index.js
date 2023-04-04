var express = require("express");
var router = express.Router();
const Pool = require("pg").Pool;
const session = require("express-session");
const path = require("path");
var dev = require("encrypto");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, "static")));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// http://localhost:3000/auth
router.post("/auth", function (request, response) {
  let email = request.body.email;
  let password = request.body.password;
  const encryptedPassword = dev.encryptdata(password);
  if (email && password) {
    pool.query(
      "SELECT * FROM ecommerce.users WHERE email = $1 AND password = $2",
      [email, encryptedPassword],
      function (error, results) {
        if (error) throw error;
        if (results.rows.length > 0) {
          request.session.loggedin = true;
          request.session.email = email;
          response.redirect("/home");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

router.get("/home", function (request, response) {
  if (request.session.loggedin) {
    response.send("Welcome back, " + request.session.email + "!");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

module.exports = router;
