/**
 * @overview User Controller
 * @description Handles all logic for user registration, login, and data retrieval using modern ES Module syntax.
 */

// 1. Converted to ES Module imports
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Added .js extension, assuming your config file is 'db.js' or 'database.js'
import pool from '../config/db.js';

// --- Helper Function to Generate JWT ---
const generateToken = (userId, email, type = 'user') => {
    return jwt.sign(
        { userId, email, type },
        process.env.JWT_SECRET, // Make sure JWT_SECRET is set in your .env file
        { expiresIn: '24h' }
    );
};

// --- Controller Functions ---

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
// 2. Converted to a named export
export const registerUser = async (req, res) => {
    try {
        const { full_name, email, password, student_id } = req.body;
        console.log('📝 User registration attempt:', email);

        if (!full_name || !email || !password) {
            return res.status(400).json({ error: 'Full name, email, and password are required' });
        }

        const [existingUsers] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const [result] = await pool.execute(
            'INSERT INTO users (full_name, email, password, student_id) VALUES (?, ?, ?, ?)',
            [full_name, email, hashedPassword, student_id || null]
        );

        const newUserId = result.insertId;
        const token = generateToken(newUserId, email);
        const userData = {
            id: newUserId,
            email: email,
            full_name: full_name,
            student_id: student_id || null,
            is_verified: false, // Default value
            role: 'user'
        };

        console.log('✅ User registered successfully:', email);
        res.status(201).json({ message: 'User registered successfully', token, user: userData });

    } catch (error) {
        console.error('❌ User registration error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

/**
 * @route   POST /api/users/login
 * @desc    Authenticate a user and get a token
 * @access  Public
 */
// 2. Converted to a named export
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('🔐 User login attempt:', email);

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user.id, user.email);
        const userData = {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            student_id: user.student_id,
            is_verified: user.is_verified,
            role: 'user'
        };

        console.log('✅ User login successful:', email);
        res.json({ message: 'Login successful', token, user: userData });

    } catch (error) {
        console.error('❌ User login error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

/**
 * @route   GET /api/users/me
 * @desc    Get the current logged-in user's data
 * @access  Private (requires authenticateToken middleware)
 */
// 2. Converted to a named export
// 3. CRITICAL FIX: This function now correctly fetches user data from the database.
export const getCurrentUser = async (req, res) => {
    try {
        // The `authenticateToken` middleware attaches the user's ID to `req.user`.
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Authentication error: User ID not found in token.' });
        }

        // Fetch the latest user data from the database, excluding the password.
        const [users] = await pool.execute(
            'SELECT id, full_name, email, student_id, is_verified FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const user = { ...users[0], role: 'user' };
        res.json({ user });

    } catch (error) {
        console.error('❌ Get current user error:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};