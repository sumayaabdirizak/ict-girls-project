// middleware/auth.js
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// User authentication middleware
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if it's a user token
        if (decoded.type === 'user') {
            const [users] = await pool.execute(
                'SELECT id, student_id, email, full_name, is_verified FROM users WHERE id = ?',
                [decoded.userId]
            );

            if (users.length === 0) {
                return res.status(401).json({ error: 'User not found' });
            }

            req.user = users[0];
        } 
        // Check if it's an admin token
        else if (decoded.type === 'admin') {
            const [admins] = await pool.execute(
                'SELECT id, email, full_name FROM admins WHERE id = ?',
                [decoded.adminId]
            );

            if (admins.length === 0) {
                return res.status(401).json({ error: 'Admin not found' });
            }

            req.admin = admins[0];
        } 
        else {
            return res.status(401).json({ error: 'Invalid token type' });
        }
        
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

// Admin authentication middleware
const requireAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if it's an admin token
        if (decoded.type !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        // Verify admin still exists
        const [admins] = await pool.execute(
            'SELECT id, email, full_name FROM admins WHERE id = ?',
            [decoded.adminId]
        );

        if (admins.length === 0) {
            return res.status(403).json({ error: 'Admin not found' });
        }

        req.admin = admins[0];
        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        
        res.status(401).json({ error: 'Authentication failed' });
    }
};

module.exports = {
    authenticateToken,
    requireAdmin
};