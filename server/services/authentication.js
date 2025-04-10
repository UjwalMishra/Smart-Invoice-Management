require("dotenv").config();

const JWT = require("jsonwebtoken");

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    profileImageUrl: user.profileImageUrl,
    name: user.name,
  };
  const token = JWT.sign(payload, process.env.JWT_SECRET);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, process.env.JWT_SECRET);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
