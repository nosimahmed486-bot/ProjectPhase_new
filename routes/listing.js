// routes/listing.js
const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");

// INDEX - Show all listings
router.get("/", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.send(allListings);
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

// NEW - Show form to create listing
router.get("/new", (req, res) => {
    res.send("New listing form coming soon!");
});

// SHOW - Show one listing
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.send("❌ Listing not found!");
        }
        res.send(listing);
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

// CREATE - Add new listing
router.post("/", async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.send("✅ Listing created!");
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

// EDIT - Show edit form
router.get("/:id/edit", async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.send("❌ Listing not found!");
        }
        res.send("Edit form for: " + listing.title);
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

// UPDATE - Update listing
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndUpdate(id, req.body.listing);
        res.send("✅ Listing updated!");
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

// DELETE - Remove listing
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.send("✅ Listing deleted!");
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

module.exports = router;