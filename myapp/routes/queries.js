const { v4: uuidv4 } = require("uuid");
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
//ORDER ENDPOINTS
const getOrders = (request, response) => {
  pool.query(
    "SELECT * FROM ecommerce.orders ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// PRODUCT ENDPOINTS
const getProducts = (request, response) => {
  pool.query(
    "SELECT * FROM ecommerce.products ORDER BY product_id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const getProductsById = (request, response) => {
  const id = request.params.id;
  pool.query(
    "SELECT * FROM ecommerce.products WHERE product_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const createProducts = (request, response) => {
  const { name, price } = request.body;
  const product_id = uuidv4();
  pool.query(
    "INSERT INTO ecommerce.products (product_id, name, price) VALUES ($1, $2, $3) RETURNING *",
    [product_id, name, price],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Product CREATED with ID: ${results.rows[0].product_id}`);
    }
  );
};
const updateProducts = (request, response) => {
  const { product_id, name, price } = request.body;
  pool.query(
    "UPDATE ecommerce.products SET name = $1, price = $2 WHERE product_id = $3 RETURNING *",
    [name, price, product_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .send(`Product UPDATED with ID: ${results.rows[0].product_id}`);
    }
  );
};
const deleteProducts = (request, response) => {
  const product_id = request.params.id;
  pool.query(
    "DELETE FROM ecommerce.products WHERE product_id = $1",
    [product_id],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Product DELETED`);
    }
  );
};

// CART ENDPOINTS
const getCarts = (request, response) => {
  pool.query(
    "SELECT * FROM ecommerce.user_carts ORDER BY user_carts_id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const getCartsById = (request, response) => {
  const id = request.params.id;
  pool.query(
    "SELECT * FROM ecommerce.user_carts WHERE user_carts_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const createCarts = (request, response) => {
  const { user_id, product_id } = request.body;
  const user_carts_id = uuidv4();
  pool.query(
    "INSERT INTO ecommerce.user_carts (user_carts_id, user_id, product_id) VALUES ($1, $2, $3) RETURNING *",
    [user_carts_id, user_id, product_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Cart CREATED with ID: ${results.rows[0].product_id}`);
    }
  );
};
const deleteCarts = (request, response) => {
  const id = request.params.id;
  pool.query(
    "DELETE FROM ecommerce.user_carts WHERE user_carts_id = $1",
    [id],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Cart DELETED`);
    }
  );
};
module.exports = {
  getUsers,
  getUsersById,
  getUsersByEmail,
  createUser,
  updateUser,
  deleteUser,
  getOrders,
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
  getCarts,
  createCarts,
  getCartsById,
  deleteCarts,
};
