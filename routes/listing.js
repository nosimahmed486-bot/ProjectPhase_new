const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listing");
const wrapAsync = require("../utils/wrapAsync"); // 👈 NEW
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(upload.single('listing[image]'), wrapAsync(listingController.create)); // 👈 ADD upload

router.route("/:id")
    .get(wrapAsync(listingController.show))
    .put(upload.single('listing[image]'), wrapAsync(listingController.update))
    .delete(wrapAsync(listingController.destroy));

// New route (stays separate)
router.get("/new", wrapAsync(listingController.renderNewForm));
router.get("/:id/edit", wrapAsync(listingController.renderEditForm));

module.exports = router;