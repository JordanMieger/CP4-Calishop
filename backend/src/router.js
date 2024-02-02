const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userControllers module for handling user-related operations

const userControllers = require("./controllers/userControllers");
const register = require("./services/register");
const { hashPassword, verifyPassword } = require("./services/hashPassword");

router.get("/users", userControllers.browse); //GOOD
router.get("/users/:id", userControllers.read);//GOOD
router.post("/users", register, hashPassword, userControllers.add);//GOOD
router.put("/users/:id", userControllers.edit);//GOOD
router.delete("/users/:id", userControllers.destroy);//GOOD
router.post("/login", verifyPassword, userControllers.login);
router.get("/logout", userControllers.logout);
// Import productControllers module for handling product-related operations

const productControllers = require("./controllers/productControllers");

router.get("/products", productControllers.browse);//GOOD
router.get("/products/:id", productControllers.read);//GOOD
router.post("/products", productControllers.add);//GOOD
router.put("/products/:id", productControllers.edit);//GOOD
router.delete("/products/:id", productControllers.destroy);//GOOD


// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */

module.exports = router;
