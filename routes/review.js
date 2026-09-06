const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviews.js");

// Create Review
router.post("/", reviewController.createReview);

// Delete Review
router.delete("/:reviewId", reviewController.destroyReview);

module.exports = router;