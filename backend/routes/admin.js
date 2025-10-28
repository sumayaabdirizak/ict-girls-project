/**
 * @overview Admin API Routes
 * @description This file defines the API routes for administrative actions, such as a test route and a simple login for testing purposes.
 * It uses the modern ES Module syntax (`import`/`export`).
 *
 * @author sumayaabdirizak
 * @created 2025-10-26
 */

// 1. Converted 'require' to 'import'
import express from 'express';

// This line was already correct
const router = express.Router();

// --- Routes ---

// A simple test route to confirm the admin routes are correctly loaded.
router.get('/test', (req, res) => {
    res.json({ 
        message: '✅ Admin routes are working!',
        timestamp: new Date().toISOString()
    });
});

// A simple, hardcoded login route for administrative testing.
// NOTE: In a production environment, this should be replaced with a proper authentication mechanism that checks against a database.
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('🔐 Admin login attempt:', email);
        
        // --- WARNING: Hardcoded credentials for testing only ---
        if (email === 'admin@jazeerauniversity.edu' && password === 'admin123') {
            // In a real app, you would use a library like 'jsonwebtoken' to create a real JWT.
            const token = 'fake-admin-jwt-token-' + Date.now();
            
            return res.json({
                message: 'Admin login successful',
                token,
                admin: {
                    id: 'admin_01',
                    email: email,
                    full_name: 'System Administrator'
                }
            });
        }
        
        // If credentials do not match, send an "Unauthorized" status.
        return res.status(401).json({ error: 'Invalid credentials' });
        
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. Converted 'module.exports' to 'export default'
export default router;