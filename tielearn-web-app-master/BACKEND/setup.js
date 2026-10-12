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

    // Tables are created by db.js on application start. 
    // This script now focuses on seeding the initial admin user.

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
