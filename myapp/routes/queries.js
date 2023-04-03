const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require("express-validator");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var CryptoJS = require("crypto-js");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query(
    "SELECT * FROM ecommerce.users ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const getUsersById = (request, response) => {
  const id = request.params.id;
  pool.query(
    "SELECT * FROM ecommerce.users WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const getUsersByEmail = (request, response) => {
  pool.query(
    "SELECT email FROM ecommerce.users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
  return;
};
const createUser = (request, response) => {
  const { name, last_name, age, password, email } = request.body;
  const id = uuidv4();
  pool.query(
    "INSERT INTO ecommerce.users (id, name, last_name, age, password, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      id,
      name,
      last_name,
      age,
      CryptoJS.AES.encrypt(JSON.stringify(password), "david").toString(),
      email,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User CREATED with ID: ${results.rows[0].id}`);
    }
  );
};
const updateUser = (request, response) => {
  const { id, name, last_name, age } = request.body;
  pool.query(
    "UPDATE ecommerce.users SET name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *",
    [name, last_name, age, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User UPDATED with ID: ${results.rows[0].id}`);
    }
  );
};
const deleteUser = (request, response) => {
  const id = request.params.id;
  pool.query("DELETE FROM ecommerce.users WHERE id = $1", [id], (error) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User DELETED`);
  });
};
module.exports = {
  getUsers,
  getUsersById,
  getUsersByEmail,
  createUser,
  updateUser,
  deleteUser,
};
