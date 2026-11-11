const pool = require('../db');

class Enrollment {
    static async create(userId, courseId) {
        const query = 'INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) RETURNING *';
        const values = [userId, courseId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async getByUserId(userId) {
        // Returns array of course IDs
        const query = 'SELECT course_id, enrolled_at FROM enrollments WHERE user_id = $1 ORDER BY enrolled_at DESC';
        const result = await pool.query(query, [userId]);
        return result.rows;
    }

    static async delete(userId, courseId) {
        const query = 'DELETE FROM enrollments WHERE user_id = $1 AND course_id = $2';
        await pool.query(query, [userId, courseId]);
        return true;
    }
}

module.exports = Enrollment;
