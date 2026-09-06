// routes/review.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// CREATE - Add a review
router.post("/", async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        
        if (!listing) {
            return res.send("❌ Listing not found!");
        }
        
        const newReview = new Review({
            comment: req.body.review.comment,
            rating: req.body.review.rating,
            author: "67c7be90b60a5986b8e502a3" // Will be replaced with actual user later
        });
        
        await newReview.save();
        listing.reviews.push(newReview);
        await listing.save();
        
        res.send("✅ Review added!");
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

// DELETE - Remove a review
router.delete("/:reviewId", async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        
        // Remove review from listing's reviews array
        await Listing.findByIdAndUpdate(id, {
            $pull: { reviews: reviewId }
        });
        
        // Delete the review itself
        await Review.findByIdAndDelete(reviewId);
        
        res.send("✅ Review deleted!");
    } catch (err) {
        res.send("❌ Error: " + err.message);
    }
});

module.exports = router;