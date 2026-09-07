// // controllers/users.js
// const User = require("../models/user.js");

// // RENDER SIGNUP FORM
// module.exports.renderSignupForm = (req, res) => {
//     res.render("users/signup.ejs");
// };

// // SIGNUP - Register new user
// module.exports.signup = async (req, res) => {
//     try {
//         let { username, email, password } = req.body;
//         const newUser = new User({ email, username });
//         const registeredUser = await User.register(newUser, password);
//         console.log(registeredUser);
//         req.login(registeredUser, (err) => {
//             if (err) {
//                 return next(err);
//             }
//             req.flash("success", "Welcome to Wanderlust!");
//             res.redirect("/listings");
//         });
//     } catch (e) {
//         req.flash("error", e.message);
//         res.redirect("/signup");
//     }
// };

// // RENDER LOGIN FORM
// module.exports.renderLoginForm = (req, res) => {
//     res.render("users/login.ejs");
// };

// // LOGIN - Authenticate user
// module.exports.login = async (req, res) => {
//     req.flash("success", "Welcome back to Wanderlust!");
//     let redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
// };

// // LOGOUT
// module.exports.logout = (req, res, next) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);
//         }
//         req.flash("success", "You are logged out!");
//         res.redirect("/listings");
//     });
// };

// ??

// controllers/user.js
const User = require("../models/user");

// SIGNUP - Show signup form
module.exports.renderSignupForm = (req, res) => {
    res.send("Signup page coming soon!");
};

// SIGNUP - Handle form submission
module.exports.signup = (req, res) => {
    res.send("Signup form submitted!");
};

// LOGIN - Show login form
module.exports.renderLoginForm = (req, res) => {
    res.send("Login page coming soon!");
};

// LOGIN - Handle form submission
module.exports.login = (req, res) => {
    res.send("Login form submitted!");
};

// LOGOUT
module.exports.logout = (req, res) => {
    res.send("Logout successful!");
};