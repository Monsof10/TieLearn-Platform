const pool = require('../db');

class Certificate {
  static async create(title, description, createdBy = null) {
    const query = 'INSERT INTO certificates (title, description, created_by) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, description, createdBy];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM certificates WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getAll() {
    const query = 'SELECT c.*, u.username as created_by_username FROM certificates c LEFT JOIN users u ON c.created_by = u.id ORDER BY c.created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async assignToUser(certificateId, userId, status = 'awarded') {
    const query = 'INSERT INTO user_certificates (user_id, certificate_id, status) VALUES ($1, $2, $3) RETURNING *';
    const values = [userId, certificateId, status];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getByUserId(userId) {
    const query = `
      SELECT uc.id as user_certificate_id, c.id as certificate_id, c.title, c.description, uc.awarded_at, uc.status
      FROM user_certificates uc
      JOIN certificates c ON uc.certificate_id = c.id
      WHERE uc.user_id = $1
      ORDER BY uc.awarded_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async removeAssignment(certificateId, userId) {
    const query = 'DELETE FROM user_certificates WHERE certificate_id = $1 AND user_id = $2';
    await pool.query(query, [certificateId, userId]);
    return true;
  }
}

module.exports = Certificate;
