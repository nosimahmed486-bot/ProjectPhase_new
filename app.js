const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");     // 👈 NEW
const ejsMate = require("ejs-mate"); // 👈 NEW
const MongoStore = require("connect-mongo"); // 👈 NEW (for storing sessions in DB)

// Import Routes
const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const ExpressError = require("./utils/ExpressError.js"); // 👈 NEW (add with other imports)

// Database Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB!");
}

main().catch(err => {
    console.log("❌ MongoDB Error:", err);
});

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate); // 👈 NEW

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));                    // 👈 NEW
app.use(express.static(path.join(__dirname, "/public"))); // 👈 NEW

// Session configuration
const sessionOptions = {
    secret: "mysecretkey", // Change this later
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions)); // 👈 NEW
app.use(flash()); // 👈 NEW

// Add this AFTER app.use(flash())
app.use((req, res, next) => {                      // 👈 NEW
    res.locals.success = req.flash("success");    // 👈 NEW
    res.locals.error = req.flash("error");        // 👈 NEW
    next();                                       // 👈 NEW
});                                               // 👈 NEW

// ========== PASSPORT CONFIGURATION (ADD THIS) ==========
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ========== MAKE USER AVAILABLE TO ALL VIEWS (ADD THIS) ==========
app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Routes
app.use("/", userRouter);
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);

// Error handling - 404 page not found
app.use((req, res, next) => {                           // 👈 NEW
    next(new ExpressError(404, "Page not Found!"));    // 👈 NEW
});                                                    // 👈 NEW

// Global error handler
app.use((err, req, res, next) => {                     // 👈 NEW
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});                                                    // 👈 NEW

// Home route
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// Start server
app.listen(3000, () => {
    console.log("✅ Server is running on port 3000!");
});