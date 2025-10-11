const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Note = require('../models/Note');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get notes
router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(notes);
});

// Add note
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ user: req.userId, title, content });
  await note.save();
  res.status(201).json(note);
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

module.exports = router;
