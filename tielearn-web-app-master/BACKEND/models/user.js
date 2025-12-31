const pool = require('../db');
const bcrypt = require('bcryptjs');

class User {
  static async create(username, email, password, role = 'student', first_name, last_name, certification, date_enrolled) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password_hash, role, first_name, last_name, certification, date_enrolled) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, username, email, role, first_name, last_name, certification, date_enrolled';
    const values = [username, email, hashedPassword, role, first_name, last_name, certification, date_enrolled];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, username, email, role, first_name, last_name, certification, date_enrolled, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getAll() {
    const query = 'SELECT id, username, email, role, first_name, last_name, certification, date_enrolled, created_at FROM users';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async updateById(id, { username, email, password, role, first_name, last_name, certification, date_enrolled }) {
    const fields = [];
    const values = [];
    let idx = 1;

    if (username !== undefined) { fields.push(`username = $${idx++}`); values.push(username); }
    if (email !== undefined) { fields.push(`email = $${idx++}`); values.push(email); }
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      fields.push(`password_hash = $${idx++}`);
      values.push(hashed);
    }
    if (role !== undefined) { fields.push(`role = $${idx++}`); values.push(role); }
    if (first_name !== undefined) { fields.push(`first_name = $${idx++}`); values.push(first_name); }
    if (last_name !== undefined) { fields.push(`last_name = $${idx++}`); values.push(last_name); }
    if (certification !== undefined) { fields.push(`certification = $${idx++}`); values.push(certification); }
    if (date_enrolled !== undefined) { fields.push(`date_enrolled = $${idx++}`); values.push(date_enrolled); }

    if (fields.length === 0) return await User.findById(id);

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, username, email, role, first_name, last_name, certification, date_enrolled`;
    values.push(id);
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async deleteById(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id, username, email, role';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = User;
