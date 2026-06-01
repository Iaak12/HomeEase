const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/auth');

router.post('/', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      url: req.file.path, // The Cloudinary URL
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Image upload failed' });
  }
});

module.exports = router;
