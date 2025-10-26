const pool = require('../config/database');

class User {
  // Find user by email
  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, student_id, email, full_name, is_verified, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Create new user
  static async create(userData) {
    const { full_name, email, password, student_id } = userData;
    const [result] = await pool.execute(
      'INSERT INTO users (full_name, email, password, student_id) VALUES (?, ?, ?, ?)',
      [full_name, email, password, student_id]
    );
    return result.insertId;
  }

  // Find admin by email
  static async findAdminByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Find admin by ID
  static async findAdminById(id) {
    const [rows] = await pool.execute(
      'SELECT id, email, full_name, created_at FROM admins WHERE id = ?',
      [id]
    );
    return rows[0];
  }
}

module.exports = User;