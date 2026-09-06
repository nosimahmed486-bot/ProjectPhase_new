const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

// Import Routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Database Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB!");
}

main().catch(err => {
    console.log("❌ MongoDB Error:", err);
});

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse form data

// Routes
app.use("/", userRouter);           // User routes (signup, login)
app.use("/listings", listingRouter); // Listing routes
app.use("/listings/:id/reviews", reviewRouter); // Review routes (nested)

// Home route (keep this for now)
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// Start server
app.listen(3000, () => {
    console.log("✅ Server is running on port 3000!");
});