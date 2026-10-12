const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db'); // Initialize database connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TieLearn  Backend API' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/certificates', require('./routes/certificates'));

// Placeholder for future routes
// app.use('/api/courses', require('./routes/courses'));
// etc.

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`TieLearn backend - Docker development mode ${PORT}`);
});

console.log('TieLearn Docker development mode');

console.log('Bind mount test 2');
