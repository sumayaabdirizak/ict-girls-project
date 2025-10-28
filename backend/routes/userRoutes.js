import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/userController.js';

// The path is now correct because auth.js is in the middleware folder
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateToken, getCurrentUser);

export default router;