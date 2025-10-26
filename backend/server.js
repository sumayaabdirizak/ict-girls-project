// server.js - FRESH AND CLEAN
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});





// Admin login
app.post('/api/admin/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('🔐 Admin login attempt:', email);
        
        // Simple authentication
        if (email === 'admin@jazeerauniversity.edu' && password === 'admin123') {
            return res.json({
                message: 'Admin login successful!',
                token: 'jwt-admin-token-12345',
                admin: {
                    id: 1,
                    email: email,
                    full_name: 'System Administrator',
                    role: 'admin'
                }
            });
        }
        
        return res.status(401).json({ error: 'Invalid email or password' });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Import and use your existing auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: '🎓 Jazeera University ICT Girls Platform API',
        version: '1.0.0',
        status: 'Running'
    });
});

// Start server
app.listen(PORT, () => {

    console.log('🎉 Ready for login!');
  
});