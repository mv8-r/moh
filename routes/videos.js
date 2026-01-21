const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Video = require('../models/Video');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// multer setup (store locally). In production use S3 or similar.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.random().toString(36).slice(2,8) + ext);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB limit (adjust)
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) cb(null, true);
    else cb(new Error('Only video files are allowed'));
  }
});

// upload a video (protected)
router.post('/upload', requireAuth, upload.single('video'), async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file' });
    const vid = new Video({
      title: title || req.file.originalname,
      filename: req.file.filename,
      originalname: req.file.originalname,
      uploader: req.user.id,
    });
    await vid.save();
    res.json({ message: 'Uploaded', video: vid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// list videos (metadata) - protected
router.get('/', requireAuth, async (req, res) => {
  try {
    const list = await Video.find().select('-__v').populate('uploader', 'username');
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// stream video by id (protected) - supports Range for seeking
router.get('/stream/:id', requireAuth, async (req, res) => {
  try {
    const vid = await Video.findById(req.params.id);
    if (!vid) return res.status(404).end();

    const filePath = path.join(uploadDir, vid.filename);
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    // rudimentary content type by extension
    const ext = path.extname(vid.filename).toLowerCase();
    const contentType = ext === '.webm' ? 'video/webm' : ext === '.ogg' ? 'video/ogg' : 'video/mp4';

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;

      const file = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': contentType,
      });
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
