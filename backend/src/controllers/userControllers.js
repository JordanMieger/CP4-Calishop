const jwt = require("jsonwebtoken");

// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const users = await tables.users.readAll();

    // Respond with the items in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const user = await tables.users.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
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

  // Extract the user data from the request body
  try {
    const userToUpdate = {
      id,
      ...req.body,
    };

    const result = await tables.users.update(userToUpdate);
    if (result.affectedRows === 0) {
      res.status(404).send("User matching this ID not found");
    }
    return res.status(200).send(`User with id: ${id} updated successfully`);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    return next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const user = req.body;
  console.log(user);
  try {
    // Insert the item into the database
    const insertId = await tables.users.create(user);

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
    // Delete the user from database
    const result = await tables.users.destroy(req.params.id);

    if (result.affectedRows === 0) {
      res.status(404).send("User matching this ID not found");
    } else {
      res
        .status(204)
        .send(`User with id: ${req.params.id} deleted successfully`);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const account = req.user;
    const token = jwt.sign({ account }, process.env.APP_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.json({ account });
  } catch (err) {
    next(err);
  }
};
const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.sendStatus(200);
  } catch (err) {
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
  login,
  logout,
};
