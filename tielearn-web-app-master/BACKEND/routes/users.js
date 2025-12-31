const express = require('express');
const User = require('../models/user');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create user (admin add subscriber)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { username, email, password, role = 'student', first_name, last_name, certification, date_enrolled } = req.body;
    const existingUser = await User.findByUsername(username);
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });
    const user = await User.create(username, email, password, role, first_name, last_name, certification, date_enrolled);
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by id (admin only)
router.get('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { username, email, password, role, first_name, last_name, certification, date_enrolled } = req.body;
    const updated = await User.updateById(req.params.id, { username, email, password, role, first_name, last_name, certification, date_enrolled });
    res.json({ message: 'User updated', user: updated });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await User.deleteById(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted', user: deleted });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user profile (authenticated users)
router.get('/profile/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
