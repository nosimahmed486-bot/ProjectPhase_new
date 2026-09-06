const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.js");

// Signup Routes
router.get("/signup", userController.renderSignupForm);
router.post("/signup", userController.signup);

// Login Routes
router.get("/login", userController.renderLoginForm);
router.post("/login", userController.login);

// Logout Route
router.get("/logout", userController.logout);

module.exports = router;