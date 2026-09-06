// models/listing.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define what a listing looks like
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: String,
        url: String
    },
    price: Number,
    location: String,
    country: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

// Create the Listing model
module.exports = mongoose.model("Listing", listingSchema);