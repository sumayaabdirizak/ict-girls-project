const express = require('express');
const { getAllPosts, createPost, getPostsByCategory } = require('../controllers/postController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', authenticateToken, createPost);
router.get('/category/:categoryId', getPostsByCategory);

module.exports = router;