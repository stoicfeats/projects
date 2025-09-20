const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `bookmarks-${Date.now()}.json`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/json') {
      cb(null, true);
    } else {
      cb(new Error('Only JSON files are allowed'), false);
    }
  }
});

// Store bookmarks in memory (in production, use a database)
let bookmarks = [];

// Routes
app.get('/api/bookmarks', (req, res) => {
  res.json(bookmarks);
});

app.post('/api/upload', upload.single('bookmarks'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const uploadedBookmarks = JSON.parse(fileContent);

    // Transform the data to match our frontend interface
    const transformedBookmarks = uploadedBookmarks.map((bookmark, index) => ({
      id: bookmark.id || `bookmark-${index}`,
      text: bookmark.text || bookmark.full_text || '',
      author: bookmark.user?.name || bookmark.author || 'Unknown',
      username: bookmark.user?.screen_name || bookmark.username || '@unknown',
      timestamp: formatTimestamp(bookmark.created_at || bookmark.timestamp),
      likes: bookmark.favorite_count || bookmark.likes || 0,
      retweets: bookmark.retweet_count || bookmark.retweets || 0,
      hasImage: hasImageContent(bookmark),
      imageUrl: getImageUrl(bookmark)
    }));

    bookmarks = transformedBookmarks;
    
    // Clean up uploaded file
    fs.unlinkSync(filePath);
    
    res.json({ 
      message: 'Bookmarks uploaded successfully', 
      count: bookmarks.length 
    });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing file' });
  }
});

// Helper functions
function formatTimestamp(timestamp) {
  if (!timestamp) return 'Unknown';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'now';
  if (diffInHours < 24) return `${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks}w`;
}

function hasImageContent(bookmark) {
  return !!(bookmark.entities?.media || 
           bookmark.extended_entities?.media || 
           bookmark.attachments?.media_keys ||
           bookmark.media);
}

function getImageUrl(bookmark) {
  const media = bookmark.entities?.media || 
               bookmark.extended_entities?.media || 
               bookmark.media;
  
  if (media && media.length > 0) {
    return media[0].media_url_https || media[0].url;
  }
  
  return null;
}

// API routes only for development
// In production, you would serve the built React app here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
