
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getAllMessages, sendMessage } = require('../controllers/chatController');

// Protect routes with auth middleware
router.get('/messages', auth, getAllMessages);
router.post('/messages', auth, sendMessage);

module.exports = router;
