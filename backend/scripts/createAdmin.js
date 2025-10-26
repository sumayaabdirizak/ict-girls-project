// scripts/createAdmin.js
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

const createFirstAdmin = async () => {
    try {
        const email = 'admin@jazeerauniversity.edu';
        const password = 'admin123';
        const full_name = 'System Administrator';
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert admin
        const [result] = await pool.execute(
            'INSERT INTO admins (email, password, full_name) VALUES (?, ?, ?)',
            [email, hashedPassword, full_name]
        );
        
        console.log('✅ First admin created successfully!');
        console.log('📧 Email:', email);
        console.log('🔑 Password:', password);
        console.log('🆔 Admin ID:', result.insertId);
        
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.log('ℹ️ Admin already exists');
        } else {
            console.error('❌ Error creating admin:', error);
        }
    } finally {
        process.exit();
    }
};

createFirstAdmin();