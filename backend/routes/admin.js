// routes/admin.js - SIMPLE WORKING VERSION
const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ 
        message: '✅ Admin routes are working!',
        timestamp: new Date().toISOString()
    });
});

// Simple login route
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('🔐 Admin login attempt:', email);
        
        // Simple hardcoded authentication for testing
        if (email === 'admin@jazeerauniversity.edu' && password === 'admin123') {
            const token = 'admin-jwt-token-' + Date.now();
            
            return res.json({
                message: 'Admin login successful',
                token,
                admin: {
                    id: 1,
                    email: email,
                    full_name: 'System Administrator'
                }
            });
        }
        
        return res.status(401).json({ error: 'Invalid credentials' });
        
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;