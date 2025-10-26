// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('🔐 User login attempt:', email);

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if user exists
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        console.log('📊 Database query result:', users);

        if (users.length === 0) {
            console.log('❌ User not found:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];
        
        // Verify password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            console.log('❌ Invalid password for user:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
                type: 'user'
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Return user data (without password)
        const userData = {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            student_id: user.student_id,
            is_verified: user.is_verified,
            role: 'user'
        };

        console.log('✅ User login successful:', email);
        
        res.json({
            message: 'Login successful',
            token,
            user: userData
        });

    } catch (error) {
        console.error('❌ User login error:', error);
        console.error('❌ Error stack:', error.stack);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
};

// User Registration
const registerUser = async (req, res) => {
    try {
        const { full_name, email, password, student_id } = req.body;

        console.log('📝 User registration attempt:', email);

        // Validation
        if (!full_name || !email || !password) {
            return res.status(400).json({ error: 'Full name, email, and password are required' });
        }

        // Check if user already exists
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const [result] = await pool.execute(
            'INSERT INTO users (full_name, email, password, student_id) VALUES (?, ?, ?, ?)',
            [full_name, email, hashedPassword, student_id || null]
        );

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: result.insertId, 
                email: email,
                type: 'user'
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Return user data
        const userData = {
            id: result.insertId,
            email: email,
            full_name: full_name,
            student_id: student_id || null,
            is_verified: false,
            role: 'user'
        };

        console.log('✅ User registered successfully:', email);
        
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: userData
        });

    } catch (error) {
        console.error('❌ User registration error:', error);
        console.error('❌ Error stack:', error.stack);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
};

// Get Current User
const getCurrentUser = async (req, res) => {
    try {
        // This middleware should be used with authenticateToken
        if (req.user) {
            // Regular user
            res.json({
                user: {
                    id: req.user.id,
                    full_name: req.user.full_name,
                    email: req.user.email,
                    student_id: req.user.student_id,
                    is_verified: req.user.is_verified,
                    role: 'user'
                }
            });
        } else if (req.admin) {
            // Admin user
            res.json({
                user: {
                    id: req.admin.id,
                    full_name: req.admin.full_name,
                    email: req.admin.email,
                    role: 'admin'
                }
            });
        } else {
            return res.status(404).json({
                error: 'User not found'
            });
        }

    } catch (error) {
        console.error('❌ Get current user error:', error);
        console.error('❌ Error stack:', error.stack);
        res.status(500).json({
            error: 'Server error',
            details: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
};