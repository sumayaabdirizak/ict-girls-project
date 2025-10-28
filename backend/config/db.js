/**
 * @overview Database Configuration
 * @description This file configures and creates a connection pool to the MySQL database using mysql2/promise.
 * It uses a default export to make the pool easily accessible throughout the application.
 */

// 1. Converted from 'require' to 'import'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Initialize dotenv to load variables from .env file
dotenv.config();

let pool;

try {
    // Create a connection pool, which is more efficient than single connections.
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Sumaya@6100',
        database: process.env.DB_NAME || 'jazeera_ict_girls',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
    
    // Log a success message to the console on successful connection.
    console.log('✅ MySQL Database connected successfully.');

} catch (error) {
    console.error('❌ MySQL Database connection failed:', error.message);
    // Exit the entire process with a failure code if the database connection fails.
    // This prevents the server from running in a broken state.
    process.exit(1); 
}

// 2. THIS IS THE FIX: Changed from 'module.exports' to 'export default'.
// This creates the default export that all your other files are looking for.
export default pool;