// controllers/listing.js
const Listing = require("../models/listing");

// INDEX - Show all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

// NEW - Show form to create listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

// SHOW - Show one listing
module.exports.show = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate("reviews") // 👈 NEW: populate reviews
        .populate("owner");  // 👈 NEW: populate owner
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/show", { listing }); // 👈 CHANGED: render view
};

/// CREATE - Add new listing
module.exports.create = async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);

        // Handle image upload (temporary - will be improved later)
        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        await newListing.save();
        req.flash("success", "✅ Listing created successfully!");
        res.redirect("/listings");
    } catch (err) {
        req.flash("error", "❌ Failed to create listing");
        res.redirect("/listings/new");
    }
};

// EDIT - Show edit form
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/edit", { listing }); // 👈 CHANGED: render view
};

// UPDATE - Update listing
module.exports.update = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    // If new image uploaded, update it
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    }
    
    req.flash("success", "✅ Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

// DELETE - Remove listing
module.exports.destroy = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.send("✅ Listing deleted!");
};