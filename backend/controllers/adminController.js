// adminController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('🔐 Admin login attempt:', email);

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if admin exists in admins table
        const [admins] = await pool.execute(
            'SELECT * FROM admins WHERE email = ?',
            [email]
        );

        if (admins.length === 0) {
            console.log('❌ Admin not found:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admin = admins[0];
        
        // Verify password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        
        if (!isPasswordValid) {
            console.log('❌ Invalid password for admin:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                adminId: admin.id, 
                email: admin.email,
                type: 'admin'
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Return admin data
        const adminData = {
            id: admin.id,
            email: admin.email,
            full_name: admin.full_name
        };

        console.log('✅ Admin login successful:', email);
        
        res.json({
            message: 'Admin login successful',
            token,
            admin: adminData
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};