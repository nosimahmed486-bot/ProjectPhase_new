const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

// Use the default export
userSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);