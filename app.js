// app.js - Our server file
const express = require("express");
const app = express();
const path = require("path"); // Need this for file paths
const mongoose = require("mongoose"); // NEW
const User = require("./models/user.js");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust_new";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB!");
}

main().catch(err => {
    console.log("❌ MongoDB Error:", err);
});


// STEP 1: Configure EJS
app.set("view engine", "ejs"); // Tell Express to use EJS
app.set("views", path.join(__dirname, "views")); // Where to find EJS files

// This is like saying "When someone visits our website, say hello"
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// TEST: Create a user
app.get("/create-user", async (req, res) => {
    try {
        const newUser = new User({
            username: "testuser",
            email: "test@example.com",
            password: "password123"
        });
        await newUser.save(); // Save to database
        res.send("✅ User created successfully!");
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

app.get("/users", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.send(allUsers);
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

// TEST: Create a listing
app.get("/create-listing", async (req, res) => {
    try {
        const newListing = new Listing({
            title: "Cozy Beach Cottage",
            description: "Beautiful cottage with ocean views",
            price: 1500,
            location: "Malibu",
            country: "United States",
            // We'll add owner later
        });
        await newListing.save();
        res.send("✅ Listing created successfully!");
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

// TEST: View all listings
app.get("/listings", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.send(allListings);
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

// TEST: Create a review
app.get("/create-review", async (req, res) => {
    try {
        // First, find a listing to review
        const listing = await Listing.findOne({}); // Get first listing
        
        if (!listing) {
            return res.send("❌ No listing found! Create one first.");
        }
        
        // Create the review
        const newReview = new Review({
            comment: "This place was amazing!",
            rating: 5,
            author: "67c7be90b60a5986b8e502a3" // Replace with actual user ID
        });
        
        await newReview.save();
        
        // Add review to listing's reviews array
        listing.reviews.push(newReview);
        await listing.save();
        
        res.send("✅ Review created and linked to listing!");
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

// TEST: View a listing with reviews
app.get("/listing-with-reviews", async (req, res) => {
    try {
        const listing = await Listing.findOne({})
            .populate("reviews"); // This fills in the review details
        
        res.send(listing);
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("✅ Server is running on port 3000!");
});