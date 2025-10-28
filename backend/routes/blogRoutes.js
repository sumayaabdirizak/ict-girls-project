import express from 'express';
import { getAllPosts, getPostById, createPost } from '../controllers/blogController.js';

const router = express.Router();

router.get('/', getAllPosts); // Fetch all posts
router.get('/:id', getPostById); // Fetch a single post by ID
router.post('/', createPost); // Create a new post (requires authentication)

export default router;