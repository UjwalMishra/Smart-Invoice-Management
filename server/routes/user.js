const express = require("express");
const { signupController, signinController } = require("../controllers/Auth");

const router = express.Router();

// API routes for signup and signin
router.post("/signup", signupController);
router.post("/signin", signinController);

// Logout route - clears the token cookie
router.post("/logout", (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
});

module.exports = router;
