const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  lastName: { type: String, required: false },
  firstName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userLiked: [], //array of ID of liked posts
  userDisliked: [], //array of ID of disliked posts
  isAdmin: { type: Boolean, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
