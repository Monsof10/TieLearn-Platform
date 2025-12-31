const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;

// Initialize tables if they don't exist
const initDb = async () => {
  const createUsersTable = `
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
    );
  `;

  const alterUsersTable = `
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
    ADD COLUMN IF NOT EXISTS last_name VARCHAR(100),
    ADD COLUMN IF NOT EXISTS certification VARCHAR(255),
    ADD COLUMN IF NOT EXISTS date_enrolled DATE;
  `;

  const createCertificatesTable = `
    CREATE TABLE IF NOT EXISTS certificates (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const createUserCertificatesTable = `
    CREATE TABLE IF NOT EXISTS user_certificates (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      certificate_id INTEGER REFERENCES certificates(id) ON DELETE CASCADE,
      awarded_at TIMESTAMP DEFAULT NOW(),
      status VARCHAR(50) DEFAULT 'awarded'
    );
  `;

  try {
    await pool.query(createUsersTable);
    await pool.query(alterUsersTable);
    await pool.query(createCertificatesTable);
    await pool.query(createUserCertificatesTable);
    console.log('Ensured users, certificates, and user_certificates tables exist');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};

initDb();
