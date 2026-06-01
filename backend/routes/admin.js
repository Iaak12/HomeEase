const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const {
  getStats,
  getAllUsers,
  changeUserRole,
  toggleUserStatus,
  deleteUser,
  getAllBookings,
  updateBookingStatus,
} = require('../controllers/adminController');

const router = express.Router();

// All admin routes require authentication + admin role
router.use(protect, adminOnly);

// Stats
router.get('/stats', getStats);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/role', changeUserRole);
router.put('/users/:id/toggle-status', toggleUserStatus);
router.delete('/users/:id', deleteUser);

// Booking management
router.get('/bookings', getAllBookings);
router.put('/bookings/:id', updateBookingStatus);

module.exports = router;
