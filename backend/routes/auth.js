const express = require('express');
const router = express.Router(); // Fix this line
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;