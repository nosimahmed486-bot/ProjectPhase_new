// routes/review.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/review"); // 👈 CHANGE: remove 's'

// Create Review
router.post("/", reviewController.create); // 👈 CHANGE: remove 'Review'

// Delete Review
router.delete("/:reviewId", reviewController.destroy); // 👈 CHANGE: remove 'Review'

module.exports = router;