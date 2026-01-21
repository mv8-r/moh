const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/videos');

require('dotenv').config();

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(express.json());
app.use(cookieParser());

// CORS: allow credentials so cookies are sent to backend from frontend
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));

// Static uploads (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/video-auth';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Mongo connected');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, ()=> console.log('Server listening on', PORT));
  })
  .catch(err => console.error(err));
