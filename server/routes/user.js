const express = require("express");
const {
  signupController,
  signinController,
  updateGmailDetails,
} = require("../controllers/Auth");
const { restrictToLoggedinUserOnly } = require("../middlewares/authentication");
const router = express.Router();
const User = require("../models/User");

// API routes for signup and signin
router.post("/signup", signupController);
router.post("/signin", signinController);

//update details
console.log(typeof updateGmailDetails);
router.put("/addgmailappPass", restrictToLoggedinUserOnly, updateGmailDetails);
// In your auth routes
router.get(
  "/checkGmailStatus",
  restrictToLoggedinUserOnly,
  async (req, res) => {
    try {
      const userId = req.user?._id; // Assuming you use auth middleware
      const userdata = await User.findById(userId);
      console.log(userdata);
      if (userdata.gmailAddress && userdata.gmailAppPassword) {
        return res.json({ hasGmail: true });
      } else {
        return res.json({ hasGmail: false });
      }
    } catch (error) {
      console.error("Error in checkGmailStatus:", error);
      return res.status(500).json({ hasGmail: false });
    }
  }
);

// Log-out route - clears the token cookie
router.post("/logout", (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
});

module.exports = router;
