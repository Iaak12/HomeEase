const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getDashboard,
  getMyBookings,
  updateProfile,
  changePassword,
} = require('../controllers/userController');

const router = express.Router();

// All user routes require authentication
router.use(protect);

router.get('/dashboard', getDashboard);
router.get('/bookings', getMyBookings);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

module.exports = router;
