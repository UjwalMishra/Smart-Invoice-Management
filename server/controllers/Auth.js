const User = require("../models/Users");
const { createTokenForUser } = require("../services/authentication");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check for empty fields
    if (!name || !email || !password) {
      return res.render("signup", {
        error: "All fields are required",
      });
    }
    // Email format validation (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.render("signup", {
        error: "Invalid email format",
      });
    }

    // Perform validations here (e.g., check if email already exists)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", {
        error: "Email already registered, please use a different one",
      });
    }
    await User.create({
      name,
      email,
      password, //we hashed the password before sending it to the server in models
    });

    return res.redirect("/user/signin");
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).render("signup", {
      error: "An error occurred while signing up. Please try again.",
    });
  }
};

const signinController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.render("signin", {
        error: "Please enter both email and password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("signin", {
        error: "User not found, Please signup",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("signin", {
        error: "Incorrect Password",
      });
    }

    user.password = undefined; // Remove password from user object

    // Returning token
    const token = createTokenForUser(user);

    return res.cookie("token", token).redirect("/");
  } catch (err) {
    console.error("Error during signin:", err);
    return res.status(500).render("signin", {
      error: "An error occurred while signing in. Please try again.",
    });
  }
};

module.exports = {
  signupController,
  signinController,
};
