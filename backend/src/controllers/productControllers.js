// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all products from the database
    const products = await tables.products.readAll();

    // Respond with the products in JSON format
    res.json(products);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific product from the database based on the provided ID
    const product = await tables.products.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (product == null) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the ID of the item to be updated from the URL path parameter
  const id = req.params.id;
  // Extract the product data from the request body
  try {
    const productToUpdate = {
      id,
      ...req.body,
    };

    const result = await tables.products.update(productToUpdate);
    if (result.affectedRows === 0) {
      res.status(404).send("Product matching this ID not found");
    }
    return res.status(200).send(`Product with ${id} updated successfully`);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    return next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the product data from the request body
  const product = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.products.create(product);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  try {
    // Delete the product from the database
    const result = await tables.products.destroy(req.params.id);

    // If the product is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (result.affectedRows === 0) {
      res.status(404).send("Product matching this ID not found");
    } else {
      res.status(204).send(`Product with ${req.params.id} deleted successfully`);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
