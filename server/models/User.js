const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  //   role: {
  //     type: String,
  //     enum: ["admin", "approver", "viewer", "user"],
  //     default: "user",
  //   },
  gmailAddress: {
    type: String,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid Gmail address"],
  },
  gmailAppPassword: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔐 Hash login password if modified
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    // Generate a salt and hash password
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    next();
  } catch (err) {
    return next(err);
  }
});

// 🔑 Password compare
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // 🔑 Gmail App Password compare
// userSchema.methods.compareGmailAppPassword = async function (enteredAppPassword) {
//   return await bcrypt.compare(enteredAppPassword, this.gmailAppPassword);
// };

module.exports = mongoose.model("User", userSchema);
