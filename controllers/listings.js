// controllers/listings.js
const Listing = require("../models/listing.js");

// INDEX - Show all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// RENDER NEW FORM - Show form to create listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// SHOW - Show one listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate("reviews")
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

// CREATE - Add new listing
module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    return res.redirect("/listings");
};

// RENDER EDIT FORM - Show edit form
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// UPDATE - Update listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// DELETE - Remove listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    return res.redirect("/listings");
};