const express = require('express');
const Certificate = require('../models/certificate');
const User = require('../models/user');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Admin: create a certificate
router.post('/', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    const { title, description } = req.body;
    const cert = await Certificate.create(title, description, req.user.id);
    res.status(201).json({ message: 'Certificate created', cert });
  } catch (error) {
    console.error('Create certificate error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: list all certificates
router.get('/', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    const certs = await Certificate.getAll();
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: assign certificate to user
router.post('/assign', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    const { certificateId, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const cert = await Certificate.findById(certificateId);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    const assignment = await Certificate.assignToUser(certificateId, userId);
    res.status(201).json({ message: 'Certificate assigned', assignment });
  } catch (error) {
    console.error('Assign certificate error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: remove assignment
router.delete('/assign', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    const { certificateId, userId } = req.body;
    await Certificate.removeAssignment(certificateId, userId);
    res.json({ message: 'Assignment removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User: get my certificates
router.get('/mine', authenticateToken, async (req, res) => {
  try {
    const certs = await Certificate.getByUserId(req.user.id);
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
