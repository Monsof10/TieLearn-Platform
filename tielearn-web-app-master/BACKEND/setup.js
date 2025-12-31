require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

async function setupDatabase() {
  try {
    console.log('Setting up database...');

    // Create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role VARCHAR(50) DEFAULT 'student',
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        certification VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('Users table ensured');

    // Create certificates table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS certificates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create user_certificates table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_certificates (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        certificate_id INTEGER REFERENCES certificates(id) ON DELETE CASCADE,
        awarded_at TIMESTAMP DEFAULT NOW(),
        status VARCHAR(50) DEFAULT 'awarded'
      )
    `);
    console.log('All tables ensured');

    // Try to create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    try {
      const result = await pool.query(
        'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) ON CONFLICT (username) DO NOTHING RETURNING *',
        ['admin', 'admin@TieLearn .com', hashedPassword, 'admin']
      );
      if (result.rows.length > 0) {
        console.log('Admin user created successfully');
      } else {
        console.log('Admin user already exists');
      }
    } catch (insertError) {
      console.error('Error inserting admin user:', insertError.message);
    }

  } catch (error) {
    console.error('Database setup error:', error.message);
  } finally {
    await pool.end();
  }
}

setupDatabase();
