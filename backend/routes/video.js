import express from "express";
import multer from "multer";
import Video from "../models/Video.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", auth, upload.single("video"), async (req, res) => {
  const video = new Video({
    title: req.body.title,
    filename: req.file.filename
  });

  await video.save();
  res.json(video);
});

router.get("/", async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

export default router;
