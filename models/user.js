// models/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the user blueprint
const userSchema = new Schema({
    username: {
        type: String,
        required: true, // Must be provided
        unique: true    // No two users can have same username
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create the User model from the schema
module.exports = mongoose.model("User", userSchema);