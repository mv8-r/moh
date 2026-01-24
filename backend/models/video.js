import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  filename: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Video", videoSchema);
