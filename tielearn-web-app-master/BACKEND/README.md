# TieLearn Backend

Backend API for the TieLearn web application built with Node.js, Express, and PostgreSQL.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up PostgreSQL database:
   - Create a database named `TieLearn_db` (or any name and update `.env`).
   - The server will automatically create the required `users` table on startup if it doesn't exist.
   - Optionally, create an admin user by running:
     ```
     node create-admin.js
     ```

3. Update `.env` file with your database credentials and a JWT secret.

4. Run the server:
   ```
   npm start
   ```

   For development:
   ```
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

- `DB_USER`: PostgreSQL username
- `DB_HOST`: Database host (usually localhost)
- `DB_NAME`: Database name
- `DB_PASSWORD`: PostgreSQL password
- `DB_PORT`: Database port (default 5432)
- `PORT`: Server port (default 5000)
- `JWT_SECRET`: Secret key for JWT tokens

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ "username": "string", "email": "string", "password": "string" }`
  - Response: `{ "message": "User created", "user": {...} }`

- `POST /api/auth/login` - Login user
  - Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token", "user": {...} }`

- `GET /api/auth/profile` - Get user profile (requires auth token)
  - Headers: `Authorization: Bearer <token>`
  - Response: User object

### Users (Admin only)

- `GET /api/users` - Get all users (admin only)
  - Headers: `Authorization: Bearer <token>`
  - Response: Array of users

- `POST /api/users` - Create a new user (admin add subscriber)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "username": "string", "email": "string", "password": "string", "role": "student|instructor|admin" }`
  - Response: `{ "message": "User created", "user": {...} }`
