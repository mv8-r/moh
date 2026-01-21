const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  filename: { type: String, required: true },
  originalname: { type: String },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Video', VideoSchema);
