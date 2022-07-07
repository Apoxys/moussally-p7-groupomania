const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  imageUrl: { type: String, required: false }, //users are not FORCED to upload an image
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  date: { type: String, required: true },
  authorId: { type: String, required: true },
});

module.exports = mongoose.model("post", postSchema);
