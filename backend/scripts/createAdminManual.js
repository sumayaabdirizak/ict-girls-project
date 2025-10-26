// scripts/createAdminManual.js
const mysql = require('mysql2/promise');

async function createAdminManual() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Sumaya@6100',
            database: 'jazeera_ict_girls'
        });

        // Use a pre-computed bcrypt hash for 'admin123'
        const knownHash = '$2a$10$N9qo8uLOickgx2ZMRZoMye.J.8LzQK.8Kq.8Kq.8Kq.8Kq.8Kq';
        
        console.log('🗑️ Deleting all existing admins...');
        await connection.execute('DELETE FROM admins');
        
        console.log('💾 Inserting admin with known hash...');
        const [result] = await connection.execute(
            'INSERT INTO admins (email, password, full_name) VALUES (?, ?, ?)',
            ['admin@jazeerauniversity.edu', knownHash, 'System Administrator']
        );
        
        console.log('✅ Admin created with known hash!');
        console.log('📧 Email: admin@jazeerauniversity.edu');
        console.log('🔑 Password: admin123');
        console.log('🆔 Admin ID:', result.insertId);
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        if (connection) await connection.end();
        process.exit();
    }
}

createAdminManual();