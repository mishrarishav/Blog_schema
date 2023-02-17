const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  coverImage: { type: String, required: true },
  authorName: { type: String, required: true },
  authorDescription: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
