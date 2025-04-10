const User = require("../models/User");

async function getEmailCredentials(userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.gmailAddress || !user.gmailAppPassword) {
    throw new Error("No Gmail credentials found for this user.");
  }

  return {
    user: user.gmailAddress,
    password: user.gmailAppPassword,
  };
}

module.exports = { getEmailCredentials };
