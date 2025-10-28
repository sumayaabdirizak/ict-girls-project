/**
 * @overview Category API Routes
 * @description This file defines the API routes for fetching community chat categories (channels).
 * It uses the modern ES Module syntax (`import`/`export`).
 *
 * @author sumayaabdirizak
 * @created 2025-10-26
 */

// 1. Converted 'require' to 'import'
import express from 'express';

// 2. Converted 'require' to 'import' and added the required '.js' extension
// NOTE: I am assuming your database config file is named 'database.js' or 'db.js'.
// Please ensure the path '../config/database.js' is correct.
import pool from '../config/db.js';

const router = express.Router();

// --- Routes ---

/**
 * @route   GET /api/categories
 * @desc    Get all chat categories
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        // Fetch all categories from the database, ordered alphabetically by name.
        // The pool.execute method is suitable for MySQL/MariaDB. If using PostgreSQL, you would use pool.query.
        const [categories] = await pool.execute('SELECT * FROM categories ORDER BY name');
        
        // Send the list of categories as a JSON response.
        res.json(categories);

    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// 3. Converted 'module.exports' to 'export default'
export default router;