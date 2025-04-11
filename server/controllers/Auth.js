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

    // +password is necessary because we set select: false in schema
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ error: "User not found, Please signup" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    const token = createTokenForUser(user);

    // ✅ Set cookie with options
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production", // Set true only on HTTPS
      sameSite: "Lax", // or 'None' if frontend is on different domain with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    // console.log("signin successfull");

    return res.status(200).json({
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

const updateGmailDetails = async (req, res) => {
  const userId = req.user?._id;
  const { gmailAddress, gmailAppPassword } = req.body;

  if (!gmailAddress || !gmailAppPassword) {
    return res.status(400).json({ message: "Both fields are required" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        gmailAddress,
        gmailAppPassword,
      },
      { new: true }
    );

    res.status(200).json({ message: "Gmail details updated successfully" });
  } catch (err) {
    console.error("Error updating Gmail details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signupController,
  signinController,
  updateGmailDetails,
};
