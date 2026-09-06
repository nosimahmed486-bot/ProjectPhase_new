// routes/user.js
const express = require("express");
const router = express.Router();

// SIGNUP - Show signup form
router.get("/signup", (req, res) => {
    res.send("Signup page coming soon!");
});

// SIGNUP - Handle form submission
router.post("/signup", (req, res) => {
    res.send("Signup form submitted!");
});

// LOGIN - Show login form
router.get("/login", (req, res) => {
    res.send("Login page coming soon!");
});

// LOGIN - Handle form submission
router.post("/login", (req, res) => {
    res.send("Login form submitted!");
});

// LOGOUT
router.get("/logout", (req, res) => {
    res.send("Logout successful!");
});

module.exports = router;