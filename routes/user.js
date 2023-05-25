const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { signup, login, updateProfile, deleteProfile, getProfile, logout } = require('../controller/user');

// Signup
router.post('/signup', signup);
// Login
router.post('/login', login);
// Logout
router.post('/logout', logout);
// Get user profile
// router.get('/profile', authMiddleware.authenticateUser, getProfile);
// // Update user profile
// router.put('/profile', authMiddleware.authenticateUser, updateProfile);
// // Delete user account
// router.delete('/profile', authMiddleware.authenticateUser, deleteProfile);

module.exports = router;