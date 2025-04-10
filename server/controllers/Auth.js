const User = require("../models/User");
const { createTokenForUser } = require("../services/authentication");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "Email already registered, please use a different one",
      });
    }

    await User.create({ name, email, password });

    return res
      .status(201)
      .json({ message: "Signup successful. Please sign in." });
  } catch (err) {
    console.error("Error during signup:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while signing up. Please try again." });
  }
};

const signinController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please enter both email and password" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ error: "User not found, Please signup" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    const token = createTokenForUser(user);

    return res
      .status(200)
      .cookie("token", token, {
        // httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
      })
      .json({
        message: "Signin successful",
        user: { name: user.name, email: user.email },
        token,
      });
  } catch (err) {
    console.error("Error during signin:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while signing in. Please try again." });
  }
};

module.exports = {
  signupController,
  signinController,
};
