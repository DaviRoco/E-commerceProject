const { v4: uuidv4 } = require("uuid");
var dev = require("encrypto");
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
  const encryptedPassword = dev.encryptdata(password);
  pool.query(
    "INSERT INTO ecommerce.users (id, name, last_name, age, password, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [id, name, last_name, age, encryptedPassword, email],
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
const getOrdersById = (request, response) => {
  const id = request.params.id;
  pool.query(
    "SELECT * FROM ecommerce.orders WHERE order_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const createOrders = (request, response) => {
  const { order_name, user_carts_id } = request.body;
  const order_id = uuidv4();
  pool.query(
    "INSERT INTO ecommerce.orders (order_id, user_carts_id, order_name) VALUES ($1, $2, $3) RETURNING *",
    [order_id, user_carts_id, order_name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Order CREATED with ID: ${results.rows[0].product_id}`);
    }
  );
};
const updateOrders = (request, response) => {
  const { order_id, order_name } = request.body;
  pool.query(
    "UPDATE ecommerce.orders SET order_name = $1 WHERE order_id = $2 RETURNING *",
    [order_name, order_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .send(`Order UPDATED with ID: ${results.rows[0].order_id}`);
    }
  );
};
const deleteOrders = (request, response) => {
  const order_id = request.params.id;
  pool.query(
    "DELETE FROM ecommerce.orders WHERE order_id = $1",
    [order_id],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Order DELETED`);
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
  let cart = {};
  pool.query(
    "SELECT * FROM ecommerce.user_carts WHERE user_carts_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
      cart = {
        user_id: results.rows[0].user_id,
        user_carts_id: results.rows[0].user_carts_id,
        product_id: results.rows[0].product_id,
      };
    }
  );
  return cart;
};
const getCartsByUserId = async (id) => {
  const user_id = id;
  try {
    const carts = await pool.query(
      "SELECT * FROM ecommerce.user_carts WHERE user_id = $1",
      [user_id]
    );
    return carts.rows;
  } catch (err) {
    return err.stack;
  }
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
const checkoutCart = async (request, response) => {
  const carts = await getCartsByUserId(request.params.id);
  const message = [];
  if (carts != null) {
    for (var i = 0; i < carts.length; i++) {
      const order_id = uuidv4();
      const order_name =
        "New order placed in the cart of the user: " +
        carts[i].user_id +
        ", with the product " +
        carts[i].user_carts_id;
      pool.query(
        "INSERT INTO ecommerce.orders (order_id, user_carts_id, order_name) VALUES ($1, $2, $3) RETURNING *",
        [order_id, carts[i].user_carts_id, order_name]
      );
    }
    response.status(200).send("Checkout received");
  } else {
    response.status(200).send(`Carts does not exist`);
  }
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
  getOrdersById,
  createOrders,
  updateOrders,
  deleteOrders,
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
  getCarts,
  createCarts,
  getCartsById,
  getCartsByUserId,
  deleteCarts,
  checkoutCart,
};
