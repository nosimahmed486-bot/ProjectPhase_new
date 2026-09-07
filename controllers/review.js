// controllers/review.js
const Listing = require("../models/listing");
const Review = require("../models/review");

// CREATE - Add a review
module.exports.create = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    const newReview = new Review({
        comment: req.body.review.comment,
        rating: req.body.review.rating,
        author: "67c7be90b60a5986b8e502a3" // Will be replaced with actual user later
    });

    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();

    res.send("✅ Review added!");
};

// DELETE - Remove a review
module.exports.destroy = async (req, res) => {
    const { id, reviewId } = req.params;

    // Remove review from listing's reviews array
    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

    // Delete the review itself
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "✅ Review deleted!"); // 👈 NEW
    res.redirect(`/listings/${id}`);

    res.send("✅ Review deleted!");
};