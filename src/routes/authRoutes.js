const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Forgot password
router.post('/forgot-password', authController.forgotPassword);

// Reset password
router.put('/reset-password/:resetToken', authController.resetPassword);

module.exports = router;
