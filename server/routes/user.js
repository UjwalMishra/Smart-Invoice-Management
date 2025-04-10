const express = require("express");
const {
  signupController,
  signinController,
  updateGmailDetails,
} = require("../controllers/Auth");
const { restrictToLoggedinUserOnly } = require("../middlewares/authentication");
const router = express.Router();

// API routes for signup and signin
router.post("/signup", signupController);
router.post("/signin", signinController);

//update details
console.log(typeof updateGmailDetails);
router.put("/addgmailappPass", restrictToLoggedinUserOnly, updateGmailDetails);

// Log-out route - clears the token cookie
router.post("/logout", (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
});

module.exports = router;
